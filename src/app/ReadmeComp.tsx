import React, { useRef } from 'react';

type ReadmeCompProps = {
  markdown: string;
};

const ReadmeComp: React.FC<ReadmeCompProps> = ({ markdown }) => {
  const preRef = useRef<HTMLPreElement>(null);

  return (
    <div className="readme-container">
      <div style={{ display: 'inline' }}> 
        <pre ref={preRef} className="whitespace-pre-wrap p-4 bg-gray-800 text-white rounded-md">
          {markdown}
        </pre>
      </div>
    </div>
  );
};

export default ReadmeComp;