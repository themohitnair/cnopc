import React, { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  placeholder: string;
}

const Input: React.FC<InputProps> = ({ placeholder, className}) => {
  return (
    <input
      type="text"
      placeholder={placeholder}
      className={`w-full bg-gray-800 text-white placeholder-gray-500 outline-none text-lg px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-500 transition-all duration-300 ${className}`}
    />
  );
}

export default Input;