import React from 'react';

interface NavButtonProps {
  link: string;
  label: string;
}

const NavButton: React.FC<NavButtonProps> = ({ link, label }) => {
  return (
    <a href={link} className="inline-block">
      <button className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg text-lg font-semibold shadow-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-blue-500">
        {label}
      </button>
    </a>
  );
};

export default NavButton;