import React from 'react';
import NavButton from "./NavButton";

const Header: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black bg-opacity-90 backdrop-blur-md shadow-lg">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0">
            <a href="/" className="text-4xl font-bold text-white hover:text-blue-400 transition-colors duration-300">
              cnopc
            </a>
          </div>
          <nav className="flex space-x-4">
            <NavButton link="https://github.com/themohitnair/synopsi" label="Source Code" />
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;