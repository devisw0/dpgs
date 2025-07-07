import React from 'react';
import SidebarNavItem from './SidebarNavItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faShoppingBag, faUser, faBoxOpen, faCog, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Sidebar.css';

function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const navItems = [
    { icon: faHome, label: 'Home', to: '/' },
    { icon: faShoppingBag, label: 'Shop', to: '/shop' },
    { icon: faUser, label: 'Profile', to: '/profile' },
    { icon: faBoxOpen, label: 'Orders' },
    { icon: faCog, label: 'Settings', onClick: () => navigate('/settings'), to: '/settings' },
    { icon: faPlus, label: 'Add' },
  ];
  return (
    <nav className="sidebar">
      {navItems.map((item, idx) => (
        item.to ? (
          <Link to={item.to} key={item.label}>
            <SidebarNavItem
              icon={<FontAwesomeIcon icon={item.icon} className="sidebar-fa-icon" />}
              label={item.label}
              className={`sidebar-nav-item${location.pathname === item.to ? ' active' : ''}`}
              onClick={item.onClick}
            />
          </Link>
        ) : (
          <SidebarNavItem
            key={item.label}
            icon={<FontAwesomeIcon icon={item.icon} className="sidebar-fa-icon" />}
            label={item.label}
            className={`sidebar-nav-item${location.pathname === '/settings' && item.label === 'Settings' ? ' active' : ''}`}
            onClick={item.onClick}
          />
        )
      ))}
    </nav>
  );
}

export default Sidebar; 