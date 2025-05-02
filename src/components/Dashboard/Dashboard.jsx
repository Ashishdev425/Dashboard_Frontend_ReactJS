import React from 'react';
import Category from '../Category/Category';
import AddWidgetModal from '../AddWidgetModal/AddWidgetModal';
import { PlusIcon } from 'lucide-react';
import './Dashboard.css';

const Dashboard = ({
  filteredData,
  isAddWidgetModalOpen,
  openAddWidgetModal,
  closeAddWidgetModal,
  selectedCategory,
  addWidget,
  removeWidget,
  dashboardData
}) => {
  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1 className="dashboard-title">CNAPP Dashboard</h1>
        <button className="add-widget-button" onClick={() => openAddWidgetModal('cnapp')}>
          <span>Add Widget</span>
          <PlusIcon size={16} />
        </button>
      </div>
      
      <div className="dashboard-content">
        {filteredData.categories.map(category => (
          <Category 
            key={category.id} 
            category={category}
            openAddWidgetModal={openAddWidgetModal}
            removeWidget={removeWidget}
          />
        ))}
      </div>

      {isAddWidgetModalOpen && (
        <AddWidgetModal
          closeAddWidgetModal={closeAddWidgetModal}
          selectedCategory={selectedCategory}
          addWidget={addWidget}
          dashboardData={dashboardData}
        />
      )}
    </div>
  );
};

export default Dashboard