'use client'

import React from 'react';
import Generate from "./Generate";
import InputRepo from "./InputRepo";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="w-full max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-xl text-gray-300">
            Enter your GitHub repository details below
          </p>
        </div>
        <div className="space-y-8">
          <InputRepo />
          <Generate/>
        </div>
      </div>
    </div>
  );
}
