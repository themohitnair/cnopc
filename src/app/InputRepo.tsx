import React from 'react';
import Input from "./Input";

interface InputRepoProps {
  setOwner: (value: string) => void;
  setRepository: (value: string) => void;
}

const InputRepo: React.FC<InputRepoProps> = ({ setOwner, setRepository }) => {
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="flex items-center space-x-2 bg-gray-800 p-2 rounded-lg">
        <Input
          placeholder="owner"
          className="flex-1"
          onChange={(e) => setOwner(e.target.value)}
        />
        <div className="text-white text-2xl font-bold">/</div>
        <Input
          placeholder="repository"
          className="flex-1"
          onChange={(e) => setRepository(e.target.value)}
        />
      </div>
    </div>
  );
};

export default InputRepo;