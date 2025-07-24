import React from 'react';

function SidebarNavItem({ icon, label, className, onClick }) {
  return (
    <div className={className} onClick={onClick} style={{ cursor: onClick ? 'pointer' : undefined }}>
      {icon}
      {/* Optionally show label for accessibility or on hover */}
      <span className="sidebar-label" style={{ display: 'none' }}>{label}</span>
    </div>
  );
}

export default SidebarNavItem; 