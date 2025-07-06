import React from 'react';

function SidebarNavItem({ icon, label, className }) {
  return (
    <div className={className}>
      {icon}
      {/* Optionally show label for accessibility or on hover */}
      <span className="sidebar-label" style={{ display: 'none' }}>{label}</span>
    </div>
  );
}

export default SidebarNavItem; 