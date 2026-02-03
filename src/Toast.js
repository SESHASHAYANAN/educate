import React, { useState, useEffect, createContext, useContext, useCallback } from 'react';
import './Toast.css';

// Toast Context for global access
const ToastContext = createContext(null);

// Toast types
export const TOAST_TYPES = {
    SUCCESS: 'success',
    ERROR: 'error',
    WARNING: 'warning',
    INFO: 'info'
};

// Individual Toast Component
const Toast = ({ id, type, message, onClose, duration = 4000 }) => {
    const [isExiting, setIsExiting] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsExiting(true);
            setTimeout(() => onClose(id), 300);
        }, duration);

        return () => clearTimeout(timer);
    }, [id, duration, onClose]);

    const handleClose = () => {
        setIsExiting(true);
        setTimeout(() => onClose(id), 300);
    };

    const icons = {
        success: '✓',
        error: '✕',
        warning: '⚠',
        info: 'ℹ'
    };

    return (
        <div className={`toast toast-${type} ${isExiting ? 'toast-exit' : 'toast-enter'}`}>
            <div className="toast-icon">{icons[type]}</div>
            <div className="toast-content">
                <span className="toast-message">{message}</span>
            </div>
            <button className="toast-close" onClick={handleClose}>×</button>
        </div>
    );
};

// Toast Container Component
const ToastContainer = ({ toasts, removeToast }) => {
    return (
        <div className="toast-container">
            {toasts.map((toast) => (
                <Toast
                    key={toast.id}
                    id={toast.id}
                    type={toast.type}
                    message={toast.message}
                    duration={toast.duration}
                    onClose={removeToast}
                />
            ))}
        </div>
    );
};

// Toast Provider Component
export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);

    const addToast = useCallback((type, message, duration = 4000) => {
        const id = Date.now() + Math.random();
        setToasts((prev) => [...prev, { id, type, message, duration }]);
        return id;
    }, []);

    const removeToast = useCallback((id) => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, []);

    const toast = {
        success: (message, duration) => addToast(TOAST_TYPES.SUCCESS, message, duration),
        error: (message, duration) => addToast(TOAST_TYPES.ERROR, message, duration),
        warning: (message, duration) => addToast(TOAST_TYPES.WARNING, message, duration),
        info: (message, duration) => addToast(TOAST_TYPES.INFO, message, duration),
        remove: removeToast
    };

    return (
        <ToastContext.Provider value={toast}>
            {children}
            <ToastContainer toasts={toasts} removeToast={removeToast} />
        </ToastContext.Provider>
    );
};

// Hook to use toast
export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
};

// Standalone toast function for non-React contexts
let globalToastFn = null;

export const setGlobalToast = (toastFn) => {
    globalToastFn = toastFn;
};

export const showToast = {
    success: (message, duration) => globalToastFn?.success(message, duration),
    error: (message, duration) => globalToastFn?.error(message, duration),
    warning: (message, duration) => globalToastFn?.warning(message, duration),
    info: (message, duration) => globalToastFn?.info(message, duration)
};

export default Toast;
