import React from 'react';

interface NavbarItemProps {
  label: string;
  active?: boolean;
  onClick?: () => void; // Add this line
}

const NavbarItem: React.FC<NavbarItemProps> = ({ label, active, onClick }) => {
  return (
    <div 
      className={active ? 'text-white cursor-default' : 'text-gray-200 hover:text-gray-300 cursor-pointer transition'}
      onClick={onClick} // Add this line
    >
      {label}
    </div>
  )
}

export default NavbarItem;
