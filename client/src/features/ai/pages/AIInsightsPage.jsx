import React, { useState } from 'react';
import PageTitle from '../../../common/layout/PageTitle.jsx';
import Button from '../../../common/ui/Button.jsx';
import LineChart from '../../../common/charts/LineChart.jsx';

export const AIInsightsPage = () => {
  const [insights, setInsights] = useState([
    {
      id: 1,
      title: 'Predictive Replacement Warning',
      type: 'warning',
      message: 'Based on average battery degradation logs, 12 MacBook Pro models are predicted to experience battery swelling issues in the next 90 days. Scheduling preventative checkups is advised.',
      savingsEstimate: 'Est. Savings: $2,400 in emergency repairs'
    },
    {
      id: 2,
      title: 'Resource Allocation Recommendation',
      type: 'info',
      message: 'AV equipment in Meeting Room B has a low usage rate (14%) compared to Room A (84%). We recommend shifting 2 projectors to the pool registry to optimize availability.',
      savingsEstimate: 'Est. Allocation Utility Gain: +40% efficiency'
    }
  ]);

  const chartData = [
    { label: 'Jul' },
    { label: 'Aug' },
    { label: 'Sep' },
    { label: 'Oct' },
    { label: 'Nov' },
    { label: 'Dec' }
  ];

  const handleDismiss = (id) => {
    setInsights(prev => prev.filter(item => item.id !== id));
  };

  return (
    <div>
      <PageTitle title="AI Asset Intelligence Hub" subtitle="Leverage machine learning for predictive maintenance, lifecycle planning, and asset optimization forecasts." />

      <div className="grid" style={{ gridTemplateColumns: '2fr 1fr', gap: 'var(--spacing-xl)', alignItems: 'start' }}>
        
        {/* Left Side: Predictions Feed and Line Graphs */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-xl)' }}>
          {/* Chart */}
          <LineChart title="Predictive Maintenance Likelihood Index (Next 6 Months)" data={chartData} />

          {/* Feed */}
          <div className="liora-card">
            <h3 style={{ marginBottom: 'var(--spacing-lg)' }}>AI Intelligent Action Recommendations</h3>

            {insights.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
                {insights.map(item => (
                  <div 
                    key={item.id} 
                    className="liora-card-stone"
                    style={{ 
                      padding: 'var(--spacing-md) var(--spacing-lg)',
                      borderLeft: item.type === 'warning' ? '4px solid var(--warning)' : '4px solid var(--sage)'
                    }}
                  >
                    <div className="flex justify-between items-start flex-responsive gap-sm" style={{ marginBottom: '8px' }}>
                      <h4 style={{ fontSize: '17px', fontWeight: 600, color: 'var(--moss)' }}>{item.title}</h4>
                      <Button variant="outline" size="sm" onClick={() => handleDismiss(item.id)}>Dismiss</Button>
                    </div>
                    <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '8px' }}>{item.message}</p>
                    <span className="eyebrow" style={{ fontSize: '11px', color: 'var(--moss)', background: 'var(--sage-light)', padding: '2px 8px', borderRadius: 'var(--radius-sm)' }}>
                      {item.savingsEstimate}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: 'var(--spacing-xl) 0', color: 'var(--text-secondary)' }}>
                All predictive anomalies and optimization recommendation logs are resolved.
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Smart Metrics */}
        <div className="liora-card-stone" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
          <h3 style={{ fontSize: '20px', marginBottom: 'var(--spacing-sm)' }}>Predictive Scores</h3>
          
          <div>
            <div className="flex justify-between" style={{ fontSize: '14px', fontWeight: 600, marginBottom: '4px' }}>
              <span>Inventory Risk Index</span>
              <span>Low (12%)</span>
            </div>
            <div style={{ height: '6px', background: 'var(--linen)', borderRadius: 'var(--radius-full)', overflow: 'hidden' }}>
              <div style={{ width: '12%', height: '100%', background: 'var(--success)' }} />
            </div>
          </div>

          <div>
            <div className="flex justify-between" style={{ fontSize: '14px', fontWeight: 600, marginBottom: '4px' }}>
              <span>Depreciation Rate Index</span>
              <span>Optimal</span>
            </div>
            <div style={{ height: '6px', background: 'var(--linen)', borderRadius: 'var(--radius-full)', overflow: 'hidden' }}>
              <div style={{ width: '85%', height: '100%', background: 'var(--sage)' }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIInsightsPage;
