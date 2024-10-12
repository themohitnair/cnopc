import React from 'react';
import Input from "./Input";


const InputRepo: React.FC = () => {
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="flex items-center space-x-2 bg-gray-800 p-2 rounded-lg">
        <Input placeholder="owner" className="flex-1"/>
        <div className="text-white text-2xl font-bold">/</div>
        <Input placeholder="repository" className="flex-1"/>
      </div>
    </div>
  );
};

export default InputRepo;