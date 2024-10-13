import React from 'react';

interface ReadmeProps {
  content: string;
}

const Readme: React.FC<ReadmeProps> = ({ content }) => {
  if (!content) return null;

  return (
    <div className="w-full max-w-2xl mx-auto mt-8 bg-gray-800 p-4 rounded-lg">
      <h2 className="text-2xl font-bold text-white mb-4">Generated README</h2>
      <pre className="text-white whitespace-pre-wrap">{content}</pre>
    </div>
  );
};

export default Readme;