import React from 'react';
import SidebarNavItem from './SidebarNavItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faShoppingBag, faUser, faBoxOpen, faCog, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Link, useLocation } from 'react-router-dom';
import './Sidebar.css';

const navItems = [
  { icon: faHome, label: 'Home', to: '/' },
  { icon: faShoppingBag, label: 'Shop', to: '/shop' },
  { icon: faUser, label: 'Profile' },
  { icon: faBoxOpen, label: 'Orders' },
  { icon: faCog, label: 'Settings' },
  { icon: faPlus, label: 'Add' },
];

function Sidebar() {
  const location = useLocation();
  return (
    <nav className="sidebar">
      {navItems.map((item, idx) => (
        item.to ? (
          <Link to={item.to} key={item.label}>
            <SidebarNavItem
              icon={<FontAwesomeIcon icon={item.icon} className="sidebar-fa-icon" />}
              label={item.label}
              className={`sidebar-nav-item${location.pathname === item.to ? ' active' : ''}`}
            />
          </Link>
        ) : (
          <SidebarNavItem
            key={item.label}
            icon={<FontAwesomeIcon icon={item.icon} className="sidebar-fa-icon" />}
            label={item.label}
            className="sidebar-nav-item"
          />
        )
      ))}
    </nav>
  );
}

export default Sidebar; 