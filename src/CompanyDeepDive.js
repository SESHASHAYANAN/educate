import React from 'react';
import './CompanyDeepDive.css';

const CompanyDeepDive = ({
    company,
    job,
    onClose,
    onContinue
}) => {
    // Mock company insights data (anonymous/aggregated)
    const getCompanyInsights = (companyName) => {
        const insights = {
            META: {
                overview: {
                    industry: 'Technology / Social Media',
                    size: '70,000+ employees',
                    founded: '2004',
                    headquarters: 'Menlo Park, CA',
                    type: 'Public (NASDAQ: META)'
                },
                culture: {
                    workLifeBalance: 3.8,
                    diversity: 4.2,
                    innovation: 4.7,
                    remotePolicy: 'Hybrid (3 days office)',
                    values: ['Move Fast', 'Be Bold', 'Focus on Impact', 'Be Open']
                },
                team: {
                    avgTeamSize: 12,
                    reportingTo: 'Engineering Manager',
                    growthOpportunities: 'Strong internal mobility',
                    learningBudget: '$5,000/year'
                },
                salary: {
                    min: 150000,
                    max: 220000,
                    median: 185000,
                    bonus: '15-25%',
                    equity: 'RSUs vesting over 4 years',
                    level: 'E4-E5 equivalent'
                },
                risks: [
                    'High-paced environment with aggressive deadlines',
                    'Frequent org restructures and project pivots',
                    'Heavy reliance on on-call rotations for some teams',
                    'Work-life balance varies significantly by team'
                ],
                benefits: [
                    'Industry-leading parental leave',
                    'Free meals & wellness programs',
                    'Generous PTO policy',
                    'Mental health support'
                ],
                sentiment: {
                    overall: 4.1,
                    recommend: 78,
                    ceoApproval: 65,
                    outlook: 'Positive',
                    growthRating: 4.3,
                    reviewCount: 12500
                }
            },
            AMAZON: {
                overview: {
                    industry: 'Technology / E-commerce / Cloud',
                    size: '1.5M+ employees',
                    founded: '1994',
                    headquarters: 'Seattle, WA',
                    type: 'Public (NASDAQ: AMZN)'
                },
                culture: {
                    workLifeBalance: 3.2,
                    diversity: 4.0,
                    innovation: 4.5,
                    remotePolicy: 'Hybrid / Office-first',
                    values: ['Customer Obsession', 'Ownership', 'Invent and Simplify', 'Bias for Action']
                },
                team: {
                    avgTeamSize: 8,
                    reportingTo: 'SDM (Software Development Manager)',
                    growthOpportunities: 'Strong with bar raiser culture',
                    learningBudget: '$3,000/year'
                },
                salary: {
                    min: 140000,
                    max: 210000,
                    median: 175000,
                    bonus: '5-15%',
                    equity: 'RSUs with backloaded vesting',
                    level: 'L5-L6 equivalent'
                },
                risks: [
                    'High performance expectations and PIP culture',
                    'Long working hours in some orgs',
                    'Frequent leadership changes',
                    'Backloaded equity vesting schedule'
                ],
                benefits: [
                    'Comprehensive health benefits',
                    'Career choice program',
                    'Employee discount',
                    'Adoption assistance'
                ],
                sentiment: {
                    overall: 3.8,
                    recommend: 72,
                    ceoApproval: 75,
                    outlook: 'Neutral',
                    growthRating: 4.0,
                    reviewCount: 45000
                }
            }
        };

        // Default fallback for other companies
        return insights[companyName] || {
            overview: {
                industry: 'Technology',
                size: '1,000+ employees',
                founded: '2010',
                headquarters: 'United States',
                type: 'Private'
            },
            culture: {
                workLifeBalance: 4.0,
                diversity: 3.8,
                innovation: 4.0,
                remotePolicy: 'Flexible',
                values: ['Innovation', 'Collaboration', 'Excellence', 'Integrity']
            },
            team: {
                avgTeamSize: 10,
                reportingTo: 'Team Lead',
                growthOpportunities: 'Good internal mobility',
                learningBudget: 'Available'
            },
            salary: {
                min: 100000,
                max: 180000,
                median: 140000,
                bonus: '10-20%',
                equity: 'Stock options available',
                level: 'Mid to Senior'
            },
            risks: [
                'Limited public data available',
                'Growing company with evolving structure',
                'Competitive market positioning'
            ],
            benefits: [
                'Health insurance',
                'Professional development',
                'Flexible PTO'
            ],
            sentiment: {
                overall: 4.0,
                recommend: 75,
                ceoApproval: 70,
                outlook: 'Positive',
                growthRating: 4.0,
                reviewCount: 500
            }
        };
    };

    const insights = getCompanyInsights(company);

    const generatePDF = async () => {
        // Create PDF content as data URL
        const content = `
COMPANY DEEP DIVE REPORT
========================
${company} - ${job?.title || 'Job Position'}
Generated: ${new Date().toLocaleDateString()}

COMPANY OVERVIEW
----------------
Industry: ${insights.overview.industry}
Size: ${insights.overview.size}
Founded: ${insights.overview.founded}
Headquarters: ${insights.overview.headquarters}
Type: ${insights.overview.type}

CULTURE & VALUES
----------------
Work-Life Balance: ${insights.culture.workLifeBalance}/5
Diversity & Inclusion: ${insights.culture.diversity}/5
Innovation: ${insights.culture.innovation}/5
Remote Policy: ${insights.culture.remotePolicy}
Core Values: ${insights.culture.values.join(', ')}

TEAM INSIGHTS
-------------
Average Team Size: ${insights.team.avgTeamSize} members
Reports To: ${insights.team.reportingTo}
Growth Opportunities: ${insights.team.growthOpportunities}
Learning Budget: ${insights.team.learningBudget}

SALARY RANGES
-------------
Range: $${insights.salary.min.toLocaleString()} - $${insights.salary.max.toLocaleString()}
Median: $${insights.salary.median.toLocaleString()}
Bonus: ${insights.salary.bonus}
Equity: ${insights.salary.equity}
Level: ${insights.salary.level}

POTENTIAL RISKS & CONSIDERATIONS
--------------------------------
${insights.risks.map((r, i) => `${i + 1}. ${r}`).join('\n')}

BENEFITS HIGHLIGHTS
-------------------
${insights.benefits.map((b, i) => `• ${b}`).join('\n')}

EMPLOYEE SENTIMENT (Aggregated & Anonymous)
-------------------------------------------
Overall Rating: ${insights.sentiment.overall}/5
Would Recommend: ${insights.sentiment.recommend}%
CEO Approval: ${insights.sentiment.ceoApproval}%
Business Outlook: ${insights.sentiment.outlook}
Career Growth Rating: ${insights.sentiment.growthRating}/5
Based on ${insights.sentiment.reviewCount.toLocaleString()} employee reviews

---
This report contains aggregated, anonymous data.
No individual employee information is disclosed.
    `;

        // Create blob and download
        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${company}_Deep_Dive_Report.txt`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    const RatingBar = ({ value, max = 5, color = '#10b981' }) => (
        <div className="rating-bar-container">
            <div className="rating-bar-bg">
                <div
                    className="rating-bar-fill"
                    style={{
                        width: `${(value / max) * 100}%`,
                        background: color
                    }}
                />
            </div>
            <span className="rating-value">{value}/{max}</span>
        </div>
    );

    const PercentageBadge = ({ value, label }) => (
        <div className="percentage-badge">
            <div className="percentage-circle">
                <svg viewBox="0 0 36 36">
                    <path
                        className="circle-bg"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path
                        className="circle-fill"
                        strokeDasharray={`${value}, 100`}
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                </svg>
                <span className="percentage-text">{value}%</span>
            </div>
            <span className="percentage-label">{label}</span>
        </div>
    );

    return (
        <div className="deep-dive-overlay">
            <div className="deep-dive-modal">
                <div className="deep-dive-header">
                    <div className="header-content">
                        <h2>🏢 Company Deep Dive</h2>
                        <h3>{company} - {job?.title || 'Position'}</h3>
                    </div>
                    <button className="close-btn" onClick={onClose}>×</button>
                </div>

                <div className="deep-dive-content">
                    {/* Anonymous Data Notice */}
                    <div className="anonymous-notice">
                        <span className="notice-icon">🔒</span>
                        <span>All data is aggregated and anonymous - no personal identifiers included</span>
                    </div>

                    {/* Overview Section */}
                    <section className="dive-section">
                        <h4>📋 Company Overview</h4>
                        <div className="overview-grid">
                            <div className="overview-item">
                                <span className="label">Industry</span>
                                <span className="value">{insights.overview.industry}</span>
                            </div>
                            <div className="overview-item">
                                <span className="label">Company Size</span>
                                <span className="value">{insights.overview.size}</span>
                            </div>
                            <div className="overview-item">
                                <span className="label">Founded</span>
                                <span className="value">{insights.overview.founded}</span>
                            </div>
                            <div className="overview-item">
                                <span className="label">Headquarters</span>
                                <span className="value">{insights.overview.headquarters}</span>
                            </div>
                        </div>
                    </section>

                    {/* Culture Section */}
                    <section className="dive-section">
                        <h4>🎯 Culture & Work Environment</h4>
                        <div className="culture-ratings">
                            <div className="rating-item">
                                <span className="rating-label">Work-Life Balance</span>
                                <RatingBar value={insights.culture.workLifeBalance} />
                            </div>
                            <div className="rating-item">
                                <span className="rating-label">Diversity & Inclusion</span>
                                <RatingBar value={insights.culture.diversity} color="#3b82f6" />
                            </div>
                            <div className="rating-item">
                                <span className="rating-label">Innovation</span>
                                <RatingBar value={insights.culture.innovation} color="#8b5cf6" />
                            </div>
                        </div>
                        <div className="culture-info">
                            <div className="info-chip">
                                <span className="chip-icon">🏠</span>
                                <span>{insights.culture.remotePolicy}</span>
                            </div>
                        </div>
                        <div className="values-list">
                            <span className="values-title">Core Values:</span>
                            <div className="values-tags">
                                {insights.culture.values.map((value, idx) => (
                                    <span key={idx} className="value-tag">{value}</span>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Team Section */}
                    <section className="dive-section">
                        <h4>👥 Team & Role Insights</h4>
                        <div className="team-grid">
                            <div className="team-item">
                                <span className="team-number">{insights.team.avgTeamSize}</span>
                                <span className="team-label">Avg Team Size</span>
                            </div>
                            <div className="team-item info">
                                <span className="team-icon">📊</span>
                                <span>Reports to: {insights.team.reportingTo}</span>
                            </div>
                            <div className="team-item info">
                                <span className="team-icon">📈</span>
                                <span>{insights.team.growthOpportunities}</span>
                            </div>
                            <div className="team-item info">
                                <span className="team-icon">📚</span>
                                <span>Learning: {insights.team.learningBudget}</span>
                            </div>
                        </div>
                    </section>

                    {/* Salary Section */}
                    <section className="dive-section salary-section">
                        <h4>💰 Compensation Ranges</h4>
                        <div className="salary-display">
                            <div className="salary-range">
                                <span className="salary-min">${insights.salary.min.toLocaleString()}</span>
                                <div className="salary-bar">
                                    <div className="salary-median" style={{ left: '50%' }}>
                                        <span className="median-label">Median</span>
                                        <span className="median-value">${insights.salary.median.toLocaleString()}</span>
                                    </div>
                                </div>
                                <span className="salary-max">${insights.salary.max.toLocaleString()}</span>
                            </div>
                        </div>
                        <div className="salary-extras">
                            <div className="extra-item">
                                <span className="extra-icon">🎁</span>
                                <span>Bonus: {insights.salary.bonus}</span>
                            </div>
                            <div className="extra-item">
                                <span className="extra-icon">📊</span>
                                <span>Equity: {insights.salary.equity}</span>
                            </div>
                            <div className="extra-item">
                                <span className="extra-icon">🏷️</span>
                                <span>Level: {insights.salary.level}</span>
                            </div>
                        </div>
                    </section>

                    {/* Risks Section */}
                    <section className="dive-section risks-section">
                        <h4>⚠️ Potential Risks & Considerations</h4>
                        <ul className="risks-list">
                            {insights.risks.map((risk, idx) => (
                                <li key={idx}>{risk}</li>
                            ))}
                        </ul>
                    </section>

                    {/* Benefits Section */}
                    <section className="dive-section">
                        <h4>✨ Benefits Highlights</h4>
                        <div className="benefits-grid">
                            {insights.benefits.map((benefit, idx) => (
                                <div key={idx} className="benefit-item">
                                    <span className="benefit-check">✓</span>
                                    <span>{benefit}</span>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Sentiment Section */}
                    <section className="dive-section sentiment-section">
                        <h4>📊 Employee Sentiment (Anonymous)</h4>
                        <div className="sentiment-badges">
                            <PercentageBadge value={insights.sentiment.recommend} label="Would Recommend" />
                            <PercentageBadge value={insights.sentiment.ceoApproval} label="CEO Approval" />
                        </div>
                        <div className="sentiment-stats">
                            <div className="stat-item">
                                <span className="stat-value">{insights.sentiment.overall}</span>
                                <span className="stat-label">Overall Rating</span>
                            </div>
                            <div className="stat-item">
                                <span className="stat-value outlook">{insights.sentiment.outlook}</span>
                                <span className="stat-label">Business Outlook</span>
                            </div>
                            <div className="stat-item">
                                <span className="stat-value">{insights.sentiment.growthRating}</span>
                                <span className="stat-label">Career Growth</span>
                            </div>
                        </div>
                        <p className="review-count">
                            Based on {insights.sentiment.reviewCount.toLocaleString()} anonymous employee reviews
                        </p>
                    </section>
                </div>

                <div className="deep-dive-footer">
                    <button className="download-btn" onClick={generatePDF}>
                        📥 Download Report (PDF)
                    </button>
                    <button className="continue-btn" onClick={onContinue}>
                        Continue to Next Job →
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CompanyDeepDive;
