import React from 'react';
import { BarChart2 } from 'lucide-react';
import './Charts.css';

const EmptyChart = ({ data }) => {
  return (
    <div className="empty-chart">
      <BarChart2 size={48} className="empty-chart-icon" />
      <p className="empty-chart-message">{data.message || 'No data available'}</p>
    </div>
  );
};

export default EmptyChart;