import React from 'react';
import { XIcon, BarChart2 } from 'lucide-react';
import './Widget.css';

// Simple text widget
const TextWidget = ({ content }) => {
  return <div className="text-widget">{content}</div>;
};

// Simple empty widget with an icon and message
const EmptyWidget = ({ message }) => {
  return (
    <div className="empty-widget">
      <BarChart2 size={48} className="empty-widget-icon" />
      <p className="empty-widget-message">{message || 'No data available'}</p>
    </div>
  );
};

// Shows total number with colored indicators
const DonutWidget = ({ data }) => {
  // If no data, show empty state
  if (data.total === 0) {
    return <EmptyWidget />;
  }

  // For cloud accounts widget
  if (data.connected !== undefined) {
    return (
      <div className="donut-chart-container">
        {/* Show the total number */}
        <div className="chart-content">
          <div className="chart-number">{data.total}</div>
          <div className="chart-label">Total</div>
        </div>

        {/* Show the breakdown */}
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

  // For risk assessment widget
  return (
    <div className="donut-chart-container">
      <div className="chart-content">
        <div className="chart-number">{data.total}</div>
        <div className="chart-label">Total</div>
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

// Shows a progress bar with colored segments
const ProgressWidget = ({ data }) => {
  if (!data?.items?.length) {
    return <EmptyWidget />;
  }

  return (
    <div className="progress-bar-container">
      {/* Show the total and title */}
      <div className="progress-title-container">
        <h4 className="progress-title">{data.total}</h4>
        <p className="progress-subtitle">{data.title}</p>
      </div>
      
      {/* Show the progress bar */}
      <div className="progress-bar">
        {data.items.map((item, index) => (
          <div 
            key={index}
            className="progress-segment"
            style={{ 
              width: `${(item.value / data.total) * 100}%`, 
              backgroundColor: item.color 
            }}
          />
        ))}
      </div>
      
      {/* Show the legend */}
      <div className="progress-legend">
        {data.items.map((item, index) => (
          <div key={index} className="legend-item">
            <span 
              className="legend-dot" 
              style={{ backgroundColor: item.color }}
            />
            <span className="legend-text">
              {item.label} ({item.value})
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

// Main Widget component that decides which type to show
const Widget = ({ widget, categoryId, removeWidget }) => {
  // Pick which widget to show based on type
  const getWidgetContent = () => {
    switch (widget.type) {
      case 'text':
        return <TextWidget content={widget.content} />;
      case 'empty-chart':
        return <EmptyWidget message={widget.data.message} />;
      case 'donut-chart':
        return <DonutWidget data={widget.data} />;
      case 'progress-bar':
        return <ProgressWidget data={widget.data} />;
      default:
        return <TextWidget content="Widget content" />;
    }
  };

  return (
    <div className="widget">
      {/* Widget header */}
      <div className="widget-header">
        <h3 className="widget-title">{widget.title}</h3>
        <button 
          className="remove-widget-button"
          onClick={() => removeWidget(categoryId, widget.id)}
          aria-label="Remove widget"
        >
          <XIcon size={16} />
        </button>
      </div>

      {/* Widget content */}
      <div className="widget-content">
        {getWidgetContent()}
      </div>
    </div>
  );
};

export default Widget;