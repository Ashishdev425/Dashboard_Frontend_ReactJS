import React from 'react';
import './Charts.css';

const ProgressBar = ({ data }) => {
  if (!data || !data.items || data.items.length === 0) {
    return <div className="empty-chart">No data available</div>;
  }

  return (
    <div className="progress-bar-container">
      <div className="progress-title-container">
        <h4 className="progress-title">{data.total}</h4>
        <p className="progress-subtitle">{data.title}</p>
      </div>
      
      <div className="progress-bar">
        {data.items.map((item, index) => {
          const widthPercentage = (item.value / data.total) * 100;
          return (
            <div 
              key={index}
              className="progress-segment"
              style={{ 
                width: `${widthPercentage}%`, 
                backgroundColor: item.color 
              }}
            />
          );
        })}
      </div>
      
      <div className="progress-legend">
        {data.items.map((item, index) => (
          <div key={index} className="legend-item">
            <span 
              className="legend-dot" 
              style={{ backgroundColor: item.color }}
            ></span>
            <span className="legend-text">
              {item.label} ({item.value})
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressBar;