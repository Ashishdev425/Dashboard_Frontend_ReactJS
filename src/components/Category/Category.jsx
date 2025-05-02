import React from 'react';
import Widget from '../Widget/Widget';
import { PlusIcon } from 'lucide-react';
import './Category.css';

// Category component displays a group of widgets
const Category = ({ category, openAddWidgetModal, removeWidget }) => {
  return (
    <div className="category">
      {/* Category title */}
      <h2 className="category-title">{category.title}</h2>

      {/* Horizontal scrollable container for widgets */}
      <div className="widgets-grid">
        {/* Display all widgets in this category */}
        {category.widgets.map(widget => (
          <div key={widget.id} className="widget-wrapper">
            <Widget 
              widget={widget} 
              categoryId={category.id}
              removeWidget={removeWidget}
            />
          </div>
        ))}

        {/* Add widget button */}
        <div 
          className="add-widget-card" 
          onClick={() => openAddWidgetModal(category.id)}
        >
          <div className="add-widget-content">
            <PlusIcon size={24} className="add-icon" />
            <span>Add Widget</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;