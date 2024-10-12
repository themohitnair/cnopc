'use client'

import React, { useState } from 'react';
import Generate from "./Generate";
import InputRepo from "./InputRepo";
import ReadmeComp from "./ReadmeComp";
import Header from "./Header";

export default function Home() {
  const [owner, setOwner] = useState('');
  const [repository, setRepository] = useState('');
  const [readme, setReadme] = useState('');
  const [error, setError] = useState('');

  const handleGenerate = async () => {
    if (!owner || !repository) {
      setError('Both owner and repository fields are required.');
      return;
    }

    try {
      const response = await fetch('/api/readme/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ owner, repository }),
      });

      const data = await response.json();

      if (response.ok) {
        setReadme(data.readme);
        setError('');
      } else {
        setError(data.error || 'Failed to generate README');
        setReadme('');
      }
    } catch (err) {
      console.error('Error generating README:', err);
      setError('An error occurred while generating the README');
      setReadme('');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black">
      <Header />
      <div className="w-full max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-xl text-gray-300">Enter your GitHub repository details below</p>
        </div>
        <div className="space-y-8">
          <InputRepo setOwner={setOwner} setRepository={setRepository} />
          <Generate onClick={handleGenerate} />
          {error && <p className="text-red-500 text-center">{error}</p>}
          {readme && <ReadmeComp markdown={readme} />}
        </div>
      </div>
    </div>
  );
}