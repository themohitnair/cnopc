import React from 'react';
import { BsFillLightningFill } from 'react-icons/bs';

interface GenerateProps {
  onClick: () => void;
  isLoading: boolean;
}

const Generate: React.FC<GenerateProps> = ({ onClick, isLoading }) => {
  return (
    <div className="w-full max-w-md mx-auto mt-8">
      <button 
        className="w-full flex justify-between items-center bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg text-lg font-semibold shadow-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-blue-500"
        onClick={onClick}
        disabled={isLoading}
      >
        <BsFillLightningFill/>
        {isLoading ? 'Generating...' : 'Generate README'}
        <BsFillLightningFill/>
      </button>
    </div>
  );
};

export default Generate;