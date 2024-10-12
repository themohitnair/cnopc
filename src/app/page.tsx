'use client'

import React, { useState } from 'react';
import Generate from "./Generate";
import InputRepo from "./InputRepo";
import Readme from "./Readme";
import { generateGitHubReadme } from "./actions/utils";

export default function Home() {
  const [owner, setOwner] = useState('');
  const [repo, setRepo] = useState('');
  const [readme, setReadme] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async () => {
    if (!owner || !repo) {
      alert('Please enter both owner and repository names.');
      return;
    }

    setIsLoading(true);
    try {
      const generatedReadme = await generateGitHubReadme(owner, repo);
      setReadme(generatedReadme);
    } catch (error) {
      console.error('Failed to generate README:', error);
      alert('Failed to generate README. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="w-full max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-xl text-gray-300">
            Enter your GitHub repository details below
          </p>
        </div>
        <div className="space-y-8">
          <InputRepo 
            onOwnerChange={setOwner} 
            onRepoChange={setRepo}
            owner={owner}
            repo={repo}
          />
          <Generate onClick={handleGenerate} isLoading={isLoading} />
          <Readme content={readme} />
        </div>
      </div>
    </div>
  );
}