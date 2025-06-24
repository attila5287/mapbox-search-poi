import React from 'react';

const Navbar = ({ onNavItemClick, activeItem }) => {
  const navItems = [
    { id: 'home', label: 'Home', icon: '🏠' },
    { id: 'map', label: 'Map', icon: '🗺️' },
    { id: 'search', label: 'Search', icon: '🔍' },
    { id: 'favorites', label: 'Favorites', icon: '⭐' },
    { id: 'settings', label: 'Settings', icon: '⚙️' }
  ];

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        {/* Brand/Logo */}
        <a className="navbar-brand d-flex align-items-center" href="#">
          <span className="me-2">🗺️</span>
          <span className="fw-bold">MapBox POI</span>
        </a>

        {/* Mobile Toggle Button */}
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav" 
          aria-controls="navbarNav" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Items */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {navItems.map((item) => (
              <li className="nav-item" key={item.id}>
                <button
                  className={`nav-link btn btn-link ${activeItem === item.id ? 'active' : ''}`}
                  onClick={() => onNavItemClick(item.id)}
                  style={{ border: 'none', background: 'none' }}
                >
                  <span className="me-1">{item.icon}</span>
                  {item.label}
                </button>
              </li>
            ))}
          </ul>

          {/* Right side buttons */}
          <div className="navbar-nav">
            <button className="btn btn-outline-light btn-sm me-2">
              <span className="me-1">👤</span>
              Login
            </button>
            <button className="btn btn-primary btn-sm">
              <span className="me-1">📝</span>
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 