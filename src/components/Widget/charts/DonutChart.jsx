import React from 'react';
import './Charts.css';

const DonutChart = ({ data }) => {
  if (data.total === 0) {
    return <div className="empty-chart">No data available</div>;
  }

  // Handle cloud accounts donut chart
  if (data.connected !== undefined) {
    const connectedPercentage = (data.connected / data.total) * 100;
    
    return (
      <div className="donut-chart-container">
        <div className="donut-chart">
          <svg viewBox="0 0 36 36" className="circular-chart">
            <path 
              className="circle-bg"
              d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <path 
              className="circle-blue"
              strokeDasharray={`${connectedPercentage}, 100`}
              d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <text x="18" y="20.35" className="chart-number">{data.total}</text>
            <text x="18" y="24" className="chart-label">Total</text>
          </svg>
        </div>
        <div className="chart-legend">
          <div className="legend-item">
            <span className="legend-dot blue"></span>
            <span className="legend-text">Connected ({data.connected})</span>
          </div>
          <div className="legend-item">
            <span className="legend-dot gray"></span>
            <span className="legend-text">Not Connected ({data.notConnected})</span>
          </div>
        </div>
      </div>
    );
  }

  // Handle risk assessment donut chart
  const passedPercentage = (data.passed / data.total) * 100;
  const failedPercentage = (data.failed / data.total) * 100;
  const warningPercentage = (data.warning / data.total) * 100;
  const notAvailablePercentage = (data.notAvailable / data.total) * 100;

  return (
    <div className="donut-chart-container">
      <div className="donut-chart">
        <svg viewBox="0 0 36 36" className="circular-chart">
          <path 
            className="circle-bg"
            d="M18 2.0845
              a 15.9155 15.9155 0 0 1 0 31.831
              a 15.9155 15.9155 0 0 1 0 -31.831"
          />
          <path 
            className="circle-green"
            strokeDasharray={`${passedPercentage}, 100`}
            d="M18 2.0845
              a 15.9155 15.9155 0 0 1 0 31.831
              a 15.9155 15.9155 0 0 1 0 -31.831"
            stroke="#10B981"
            strokeDashoffset="0"
          />
          <path 
            className="circle-red"
            strokeDasharray={`${failedPercentage}, 100`}
            d="M18 2.0845
              a 15.9155 15.9155 0 0 1 0 31.831
              a 15.9155 15.9155 0 0 1 0 -31.831"
            stroke="#EF4444"
            strokeDashoffset={`${-passedPercentage}`}
          />
          <path 
            className="circle-yellow"
            strokeDasharray={`${warningPercentage}, 100`}
            d="M18 2.0845
              a 15.9155 15.9155 0 0 1 0 31.831
              a 15.9155 15.9155 0 0 1 0 -31.831"
            stroke="#F59E0B"
            strokeDashoffset={`${-(passedPercentage + failedPercentage)}`}
          />
          <path 
            className="circle-gray"
            strokeDasharray={`${notAvailablePercentage}, 100`}
            d="M18 2.0845
              a 15.9155 15.9155 0 0 1 0 31.831
              a 15.9155 15.9155 0 0 1 0 -31.831"
            stroke="#9CA3AF"
            strokeDashoffset={`${-(passedPercentage + failedPercentage + warningPercentage)}`}
          />
          <text x="18" y="20.35" className="chart-number">{data.total}</text>
          <text x="18" y="24" className="chart-label">Total</text>
        </svg>
      </div>
      <div className="chart-legend">
        <div className="legend-item">
          <span className="legend-dot red"></span>
          <span className="legend-text">Failed ({data.failed})</span>
        </div>
        <div className="legend-item">
          <span className="legend-dot yellow"></span>
          <span className="legend-text">Warning ({data.warning})</span>
        </div>
        <div className="legend-item">
          <span className="legend-dot gray-light"></span>
          <span className="legend-text">Not available ({data.notAvailable})</span>
        </div>
        <div className="legend-item">
          <span className="legend-dot green"></span>
          <span className="legend-text">Passed ({data.passed})</span>
        </div>
      </div>
    </div>
  );
};

export default DonutChart;