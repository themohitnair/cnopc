import React from 'react';

interface InputProps {
  placeholder: string;
}

const Input: React.FC<InputProps> = ({ placeholder }) => {
  return (
    <input
      type="text"
      placeholder={placeholder}
      className="border border-[#171717] rounded-sm px-2 py-2 bg-background text-gray-200 outline-none focus:ring-0 focus:border-[#171717] flex-grow"
    />
  );
}

export default Input;