import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faShoppingCart, faCog } from '@fortawesome/free-solid-svg-icons';
import './Header.css';

function HeaderIcons() {
  return (
    <div className="header-icons">
      <FontAwesomeIcon icon={faUser} className="header-icon" />
      <FontAwesomeIcon icon={faShoppingCart} className="header-icon" />
      <FontAwesomeIcon icon={faCog} className="header-icon" />
    </div>
  );
}

export default HeaderIcons; 