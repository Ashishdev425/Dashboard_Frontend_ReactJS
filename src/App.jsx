import React, { useState, useEffect } from 'react';
import Header from './components/Header/Header';
import Dashboard from './components/Dashboard/Dashboard';
import { initialData } from './data/initialData';
import './App.css';

function App() {
  // Store the main dashboard data
  const [dashboardData, setDashboardData] = useState(initialData);
  
  // Store the search query from the header
  const [searchQuery, setSearchQuery] = useState('');
  
  // Store filtered data based on search
  const [filteredData, setFilteredData] = useState(initialData);
  
  // Control the add widget modal
  const [isAddWidgetModalOpen, setIsAddWidgetModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Filter data whenever search query changes
  useEffect(() => {
    // If search is empty, show all data
    if (!searchQuery.trim()) {
      setFilteredData(dashboardData);
      return;
    }

    // Filter widgets based on search query
    const query = searchQuery.toLowerCase();
    const filtered = {
      categories: dashboardData.categories.map(category => ({
        ...category,
        widgets: category.widgets.filter(widget => 
          widget.title.toLowerCase().includes(query)
        )
      }))
    };

    setFilteredData(filtered);
  }, [searchQuery, dashboardData]);

  // Add a new widget to a category
  const addWidget = (categoryId, updatedData) => {
    // If we're updating the entire dashboard
    if (updatedData.categories) {
      setDashboardData(updatedData);
      return;
    }

    // If we're adding a single widget
    setDashboardData(prevData => {
      // Create new widget with unique ID
      const newWidget = {
        id: `widget-${Date.now()}`,
        type: updatedData.type || 'text',
        ...updatedData
      };

      // Add widget to the correct category
      const newData = {
        ...prevData,
        categories: prevData.categories.map(category => 
          category.id === categoryId
            ? {
                ...category,
                widgets: [...category.widgets, newWidget]
              }
            : category
        )
      };

      return newData;
    });
  };

  // Remove a widget from a category
  const removeWidget = (categoryId, widgetId) => {
    setDashboardData(prevData => ({
      ...prevData,
      categories: prevData.categories.map(category => 
        category.id === categoryId
          ? {
              ...category,
              widgets: category.widgets.filter(w => w.id !== widgetId)
            }
          : category
      )
    }));
  };

  // Open the add widget modal
  const openAddWidgetModal = (categoryId) => {
    setSelectedCategory(categoryId);
    setIsAddWidgetModalOpen(true);
  };

  // Close the add widget modal
  const closeAddWidgetModal = () => {
    setIsAddWidgetModalOpen(false);
    setSelectedCategory(null);
  };

  return (
    <div className="app">
      {/* Header with search functionality */}
      <Header 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery} 
      />

      {/* Main dashboard content */}
      <Dashboard 
        filteredData={filteredData}
        isAddWidgetModalOpen={isAddWidgetModalOpen}
        openAddWidgetModal={openAddWidgetModal}
        closeAddWidgetModal={closeAddWidgetModal}
        selectedCategory={selectedCategory}
        addWidget={addWidget}
        removeWidget={removeWidget}
        dashboardData={dashboardData}
      />
    </div>
  );
}

export default App;