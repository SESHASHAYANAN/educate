import React, { useState, useRef, useEffect } from 'react';
import './SwipeCard.css';

// Card theme colors - different for each job
const CARD_THEMES = [
    { bg: 'linear-gradient(160deg, #2d1b4e 0%, #1e1538 50%, #150f28 100%)', border: 'rgba(168, 85, 247, 0.4)', accent: '#a855f7' },
    { bg: 'linear-gradient(160deg, #1e3a5f 0%, #152844 50%, #0d1d30 100%)', border: 'rgba(59, 130, 246, 0.4)', accent: '#3b82f6' },
    { bg: 'linear-gradient(160deg, #1a4d3e 0%, #133b30 50%, #0c2820 100%)', border: 'rgba(16, 185, 129, 0.4)', accent: '#10b981' },
    { bg: 'linear-gradient(160deg, #4a1c3d 0%, #3a1530 50%, #280f22 100%)', border: 'rgba(236, 72, 153, 0.4)', accent: '#ec4899' },
    { bg: 'linear-gradient(160deg, #4a3520 0%, #3a2a18 50%, #281d10 100%)', border: 'rgba(245, 158, 11, 0.4)', accent: '#f59e0b' },
    { bg: 'linear-gradient(160deg, #3d1a1a 0%, #2e1414 50%, #1f0e0e 100%)', border: 'rgba(239, 68, 68, 0.4)', accent: '#ef4444' },
    { bg: 'linear-gradient(160deg, #1a3d3d 0%, #142e2e 50%, #0e1f1f 100%)', border: 'rgba(20, 184, 166, 0.4)', accent: '#14b8a6' },
    { bg: 'linear-gradient(160deg, #3d3d1a 0%, #2e2e14 50%, #1f1f0e 100%)', border: 'rgba(234, 179, 8, 0.4)', accent: '#eab308' },
];

// Individual Swipe Card Component
const SwipeCard = ({ job, onSwipe, isTop, style, cardIndex = 0 }) => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [startPos, setStartPos] = useState({ x: 0, y: 0 });
    const [swipeDirection, setSwipeDirection] = useState(null);
    const [animateClass, setAnimateClass] = useState('');
    const cardRef = useRef(null);

    // Get theme based on job id or index
    const theme = CARD_THEMES[(job.id || cardIndex) % CARD_THEMES.length];

    const SWIPE_THRESHOLD = 120;

    const handleStart = (clientX, clientY) => {
        if (!isTop) return;
        setIsDragging(true);
        setStartPos({ x: clientX, y: clientY });
    };

    const handleMove = (clientX, clientY) => {
        if (!isDragging || !isTop) return;

        const deltaX = clientX - startPos.x;
        const deltaY = clientY - startPos.y;

        setPosition({ x: deltaX, y: deltaY });

        if (deltaX > 60) {
            setSwipeDirection('right');
        } else if (deltaX < -60) {
            setSwipeDirection('left');
        } else {
            setSwipeDirection(null);
        }
    };

    const handleEnd = () => {
        if (!isDragging || !isTop) return;
        setIsDragging(false);

        if (position.x > SWIPE_THRESHOLD) {
            // Animate then trigger swipe
            setAnimateClass('selecting');
            setTimeout(() => {
                onSwipe('right', job);
            }, 400);
        } else if (position.x < -SWIPE_THRESHOLD) {
            setAnimateClass('rejecting');
            setTimeout(() => {
                onSwipe('left', job);
            }, 300);
        } else {
            // Reset position with spring animation
            setPosition({ x: 0, y: 0 });
            setSwipeDirection(null);
        }
    };

    // Mouse events
    const handleMouseDown = (e) => handleStart(e.clientX, e.clientY);
    const handleMouseMove = (e) => handleMove(e.clientX, e.clientY);
    const handleMouseUp = () => handleEnd();

    // Touch events
    const handleTouchStart = (e) => handleStart(e.touches[0].clientX, e.touches[0].clientY);
    const handleTouchMove = (e) => handleMove(e.touches[0].clientX, e.touches[0].clientY);
    const handleTouchEnd = () => handleEnd();

    useEffect(() => {
        if (isDragging) {
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
            document.addEventListener('touchmove', handleTouchMove);
            document.addEventListener('touchend', handleTouchEnd);
        }

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
            document.removeEventListener('touchmove', handleTouchMove);
            document.removeEventListener('touchend', handleTouchEnd);
        };
    }, [isDragging, position]);

    const cardStyle = {
        ...style,
        background: theme.bg,
        borderColor: theme.border,
        '--card-accent': theme.accent,
        transform: `translate(${position.x}px, ${position.y}px) rotate(${position.x * 0.05}deg)`,
        transition: isDragging ? 'none' : 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    };

    const handleButtonSwipe = (direction) => {
        if (!isTop) return;
        setAnimateClass(direction === 'right' ? 'selecting' : 'rejecting');
        setSwipeDirection(direction);
        setTimeout(() => {
            onSwipe(direction, job);
        }, direction === 'right' ? 500 : 300);
    };

    return (
        <div
            ref={cardRef}
            className={`swipe-card ${isDragging ? 'dragging' : ''} ${swipeDirection === 'right' ? 'swiping-right' : swipeDirection === 'left' ? 'swiping-left' : ''} ${animateClass}`}
            style={cardStyle}
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
        >
            {/* Swipe Indicators */}
            <div className={`swipe-indicator select ${swipeDirection === 'right' ? 'visible' : ''}`}>
                ✓ APPLY
            </div>
            <div className={`swipe-indicator reject ${swipeDirection === 'left' ? 'visible' : ''}`}>
                ✕ SKIP
            </div>

            {/* Card Header */}
            <div className="swipe-card-header">
                <img
                    src={job.imgSrc}
                    alt={job.company}
                    className="swipe-card-logo"
                    onError={(e) => { e.target.src = 'https://via.placeholder.com/80?text=' + job.company[0]; }}
                />
                <div className="swipe-card-company-info">
                    <h2 className="swipe-card-company">{job.company}</h2>
                    <span className={`swipe-card-status ${job.onlineStatus?.toLowerCase().includes('online') ? 'online' : 'offline'}`}>
                        {job.onlineStatus}
                    </span>
                </div>
            </div>

            {/* Card Body */}
            <div className="swipe-card-body">
                <h3 className="swipe-card-title">{job.title}</h3>
                <p className="swipe-card-salary">{job.salary}</p>
                <p className="swipe-card-type">{job.jobType || 'Full-time'}</p>
                <p className="swipe-card-apps">{job.applications}</p>
                <p className="swipe-card-time">⏰ {job.timeLeft}</p>
            </div>

            {/* Requirements */}
            <div className="swipe-card-requirements">
                <h4>Requirements</h4>
                <div className="swipe-card-tags">
                    {job.requirements?.map((req, idx) => (
                        <span key={idx} className="swipe-card-tag">{req}</span>
                    ))}
                </div>
            </div>

            {/* Description Preview */}
            {job.description && (
                <div className="swipe-card-description">
                    <p>{job.description.substring(0, 150)}...</p>
                </div>
            )}

            {/* Action Buttons */}
            {isTop && (
                <div className="swipe-card-actions">
                    <button
                        className="swipe-btn reject-btn"
                        onClick={(e) => { e.stopPropagation(); handleButtonSwipe('left'); }}
                    >
                        ✕ Skip
                    </button>
                    <button
                        className="swipe-btn select-btn"
                        onClick={(e) => { e.stopPropagation(); handleButtonSwipe('right'); }}
                    >
                        ✓ Apply
                    </button>
                </div>
            )}
        </div>
    );
};

// Swipe Card Stack Component
const SwipeCardStack = ({ jobs, onSelect, onReject, onEmpty }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedJobs, setSelectedJobs] = useState([]);
    const [rejectedJobs, setRejectedJobs] = useState([]);

    const handleSwipe = (direction, job) => {
        if (direction === 'right') {
            setSelectedJobs(prev => [...prev, job]);
            onSelect(job);
        } else {
            setRejectedJobs(prev => [...prev, job]);
            onReject(job);
        }

        // Move to next card
        if (currentIndex < jobs.length - 1) {
            setCurrentIndex(prev => prev + 1);
        } else {
            onEmpty(selectedJobs, rejectedJobs);
        }
    };

    const remainingJobs = jobs.slice(currentIndex);
    const progress = ((currentIndex) / jobs.length) * 100;

    if (remainingJobs.length === 0) {
        return (
            <div className="swipe-stack-container">
                <div className="swipe-stack-empty">
                    <span className="empty-icon">🎉</span>
                    <h3>All Done!</h3>
                    <p>You've reviewed all available jobs</p>
                    <p style={{ color: '#00ff88', fontWeight: '600', marginTop: '16px' }}>
                        Applied to: {selectedJobs.length} jobs
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="swipe-stack-container">
            {/* Progress */}
            <div className="swipe-stack-progress">
                <span>
                    {currentIndex + 1} / {jobs.length} Jobs
                </span>
                <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${progress}%` }} />
                </div>
            </div>

            {/* Card Stack */}
            <div className="swipe-stack">
                {remainingJobs.slice(0, 3).map((job, idx) => (
                    <SwipeCard
                        key={job.id}
                        job={job}
                        isTop={idx === 0}
                        onSwipe={handleSwipe}
                        cardIndex={currentIndex + idx}
                        style={{
                            zIndex: 3 - idx,
                            transform: `translateY(${idx * 12}px) scale(${1 - idx * 0.04})`,
                            opacity: idx === 2 ? 0.7 : 1
                        }}
                    />
                ))}
            </div>

            {/* Instructions */}
            <div className="swipe-instructions">
                <span className="instruction-left">← SKIP</span>
                <span className="instruction-right">APPLY →</span>
            </div>
        </div>
    );
};

export { SwipeCard, SwipeCardStack };
export default SwipeCardStack;
