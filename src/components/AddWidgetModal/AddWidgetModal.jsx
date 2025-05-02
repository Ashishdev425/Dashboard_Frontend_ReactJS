import React, { useState } from 'react';
import { XIcon, Plus } from 'lucide-react';
import { availableWidgets } from '../../data/initialData';
import './AddWidgetModal.css';

const AddWidgetModal = ({
  closeAddWidgetModal,
  addWidget,
  selectedCategory,
  dashboardData
}) => {
  const [activeTab, setActiveTab] = useState(
    dashboardData.categories.find(c => c.id === selectedCategory)?.id || 'cspm'
  );
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newWidgetName, setNewWidgetName] = useState('');
  const [newWidgetContent, setNewWidgetContent] = useState('');

  const [selectedWidgets, setSelectedWidgets] = useState(() => {
    const category = dashboardData.categories.find(c => c.id === activeTab);
    const activeWidgetIds = category?.widgets.map(w => w.id) || [];
    return availableWidgets[activeTab].reduce((acc, widget) => {
      acc[widget.id] = activeWidgetIds.includes(widget.id);
      return acc;
    }, {});
  });

  const handleWidgetToggle = (widget) => {
    setSelectedWidgets(prev => ({
      ...prev,
      [widget.id]: !prev[widget.id]
    }));
  };

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    setIsAddingNew(false);
    const category = dashboardData.categories.find(c => c.id === tabId);
    const activeWidgetIds = category?.widgets.map(w => w.id) || [];
    setSelectedWidgets(
      availableWidgets[tabId].reduce((acc, widget) => {
        acc[widget.id] = activeWidgetIds.includes(widget.id);
        return acc;
      }, {})
    );
  };

  const handleConfirm = () => {
    const category = dashboardData.categories.find(c => c.id === activeTab);
    if (!category) return;

    // Get current widgets in the category
    const currentWidgets = category.widgets;
    
    // Create a new array for updated widgets
    let updatedWidgets = [...currentWidgets];

    // Handle existing widgets
    availableWidgets[activeTab].forEach(availableWidget => {
      const isCurrentlySelected = selectedWidgets[availableWidget.id];
      const existsInCategory = currentWidgets.some(w => w.id === availableWidget.id);

      if (isCurrentlySelected && !existsInCategory) {
        // Add widget if it's selected but not in category
        updatedWidgets.push({
          ...availableWidget,
          type: availableWidget.type || 'text'
        });
      } else if (!isCurrentlySelected && existsInCategory) {
        // Remove widget if it's not selected but exists in category
        updatedWidgets = updatedWidgets.filter(w => w.id !== availableWidget.id);
      }
    });

    // Add new custom widget if data is provided
    if (isAddingNew && newWidgetName.trim()) {
      const newWidget = {
        id: `custom-${Date.now()}`,
        title: newWidgetName.trim(),
        type: 'text',
        content: newWidgetContent.trim()
      };
      updatedWidgets.push(newWidget);

      // Add the new widget to availableWidgets list
      if (!availableWidgets[activeTab].some(w => w.id === newWidget.id)) {
        availableWidgets[activeTab].push(newWidget);
      }
    }

    // Update the dashboard data
    const updatedDashboardData = {
      ...dashboardData,
      categories: dashboardData.categories.map(c =>
        c.id === activeTab ? { ...c, widgets: updatedWidgets } : c
      )
    };

    // Set the new dashboard data
    addWidget(activeTab, updatedDashboardData);
    closeAddWidgetModal();
  };

  const categoryTabs = dashboardData.categories.map(category => ({
    id: category.id,
    title: category.title.split(' ')[0]
  }));

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h3 className="modal-title">Add Widget</h3>
          <button className="close-button" onClick={closeAddWidgetModal}>
            <XIcon size={18} />
          </button>
        </div>
        
        <div className="modal-body">
          <p className="modal-description">
            Personalize your dashboard by selecting or creating widgets
          </p>
          
          <div className="tabs">
            {categoryTabs.map(tab => (
              <button
                key={tab.id}
                className={`tab ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => handleTabChange(tab.id)}
              >
                {tab.title}  
              </button>
            ))}
          </div>
          
          <div className="widget-options">
            {availableWidgets[activeTab].map(widget => (
              <div key={widget.id} className="widget-option">
                <input 
                  type="checkbox" 
                  id={widget.id} 
                  checked={selectedWidgets[widget.id] || false}
                  onChange={() => handleWidgetToggle(widget)}
                />
                <label htmlFor={widget.id}>{widget.title}</label>
              </div>
            ))}
          </div>

          <div className="new-widget-section">
            <button 
              className="add-new-widget-button"
              onClick={() => setIsAddingNew(!isAddingNew)}
            >
              <Plus size={16} />
              <span>Add New Widget</span>
            </button>

            {isAddingNew && (
              <div className="new-widget-form">
                <div className="form-group">
                  <label htmlFor="widget-name">Widget Name</label>
                  <input
                    type="text"
                    id="widget-name"
                    value={newWidgetName}
                    onChange={(e) => setNewWidgetName(e.target.value)}
                    placeholder="Enter widget name"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="widget-content">Widget Content</label>
                  <textarea
                    id="widget-content"
                    value={newWidgetContent}
                    onChange={(e) => setNewWidgetContent(e.target.value)}
                    placeholder="Enter widget content"
                    rows={3}
                  />
                </div>
              </div>
            )}
          </div>
          
          <div className="modal-footer">
            <button 
              type="button" 
              className="cancel-button"
              onClick={closeAddWidgetModal}
            >
              Cancel
            </button>
            <button 
              type="button" 
              className="confirm-button"
              onClick={handleConfirm}
              disabled={isAddingNew && !newWidgetName.trim()}
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddWidgetModal;