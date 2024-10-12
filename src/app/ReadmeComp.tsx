import React, { useState, useEffect } from 'react';
import ReactMarkdown, { Components } from 'react-markdown';
import { motion } from 'framer-motion';

const ReadmeComp: React.FC = () => {
  const [markdown, setMarkdown] = useState('');

  useEffect(() => {
    const fetchMarkdown = async () => {
      const response = await fetch('/api/readme');
      const text = await response.text();
      setMarkdown(text);
    };
    fetchMarkdown();
  }, []);

  const components: Partial<Components> = {
    h1: ({ children, ...props }) => (
      <h1 className="text-3xl font-bold text-white mb-4" {...props}>{children}</h1>
    ),
    h2: ({ children, ...props }) => (
      <h2 className="text-2xl font-semibold text-white mt-6 mb-3" {...props}>{children}</h2>
    ),
    h3: ({ children, ...props }) => (
      <h3 className="text-xl font-semibold text-white mt-4 mb-2" {...props}>{children}</h3>
    ),
    p: ({ children, ...props }) => (
      <p className="text-gray-300 mb-4" {...props}>{children}</p>
    ),
    a: ({ href, children, ...props }) => (
      <a href={href} className="text-blue-400 hover:underline" {...props}>{children}</a>
    ),
    ul: ({ children, ...props }) => (
      <ul className="list-disc list-inside text-gray-300 mb-4" {...props}>{children}</ul>
    ),
    ol: ({ children, ...props }) => (
      <ol className="list-decimal list-inside text-gray-300 mb-4" {...props}>{children}</ol>
    ),
    code: ({ inline, className, children, node, ...props }: React.ComponentPropsWithoutRef<'code'> & {
      inline?: boolean;
      node?: any;
    }) => {
      const match = /language-(\w+)/.exec(className || '');
      return !inline && match ? (
        <pre className="bg-gray-700 text-white p-2 rounded mb-4 overflow-x-auto" {...props}>
          <code className={className}>
            {children}
          </code>
        </pre>
      ) : (
        <code className="bg-gray-700 text-white px-1 rounded" {...props}>
          {children}
        </code>
      );
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-800 rounded-lg shadow-lg p-6 mt-8"
    >
      <ReactMarkdown components={components}>
        {markdown}
      </ReactMarkdown>
    </motion.div>
  );
};

export default ReadmeComp;