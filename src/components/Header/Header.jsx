import React from 'react';
import { SearchIcon } from 'lucide-react';
import './Header.css';

const Header = ({ searchQuery, setSearchQuery }) => {
  return (
    <header className="header">
      <div className="header-left">
        <div className="breadcrumb">
          <span className="breadcrumb-item">Home</span>
          <span className="breadcrumb-separator">&gt;</span>
          <span className="breadcrumb-item active">Dashboard V2</span>
        </div>
      </div>
      <div className="header-center">
        <div className="search-wrapper">
          <SearchIcon size={18} className="search-icon" />
          <input
            type="text"
            className="search-input"
            placeholder="Search anything..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      <div className="header-right">
        <div className="days-filter">
          <span className="user-icon">B</span>
          <span className="days-text">Last 2 days</span>
          <span className="dropdown-icon">▼</span>
        </div>
      </div>
    </header>
  );
};

export default Header