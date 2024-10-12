import React from 'react';
import Input from "./Input";

interface InputRepoProps {
  onOwnerChange: (value: string) => void;
  onRepoChange: (value: string) => void;
  owner: string;
  repo: string;
}

const InputRepo: React.FC<InputRepoProps> = ({ onOwnerChange, onRepoChange, owner, repo }) => {
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="flex items-center space-x-2 bg-gray-800 p-2 rounded-lg">
        <Input 
          placeholder="owner" 
          className="flex-1" 
          value={owner} 
          onChange={(e) => onOwnerChange(e.target.value)}
        />
        <div className="text-white text-2xl font-bold">/</div>
        <Input 
          placeholder="repository" 
          className="flex-1" 
          value={repo} 
          onChange={(e) => onRepoChange(e.target.value)}
        />
      </div>
    </div>
  );
};

export default InputRepo;