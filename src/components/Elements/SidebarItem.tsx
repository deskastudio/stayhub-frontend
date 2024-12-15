import React from 'react';
import { NavLink } from 'react-router-dom';

interface SidebarItemProps {
  label: string;
  href: string;
  iconSrc: string;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ label, href, iconSrc }) => (
  <NavLink
    to={href}
    className={({ isActive }) =>
      `flex items-center p-3 rounded-lg transition-colors ${
        isActive
          ? 'bg-primary-dark text-white'
          : 'text-gray-700 hover:bg-gray-100'
      }`
    }
  >
    <img src={iconSrc} alt={`${label} icon`} className='w-6 h-6 mr-3' />
    <span className='text-md font-medium'>{label}</span>
  </NavLink>
);

export default SidebarItem;
