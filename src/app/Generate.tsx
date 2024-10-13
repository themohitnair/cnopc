import React from 'react';
import { BsFillLightningFill } from 'react-icons/bs';

const Generate: React.FC = () => {
  return (
    <div className="w-full max-w-md mx-auto mt-8">
      <button className="w-full flex justify-between items-center bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg text-lg font-semibold shadow-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-blue-500">
        <BsFillLightningFill/>
        Generate README
        <BsFillLightningFill/>
      </button>
    </div>
  );
};

export default Generate;