import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { motion } from 'framer-motion';
import { getReadme } from './apiUtils';

interface ReadmeDisplayProps {
  username: string;
  repo: string;
  branch?: string;
}

const ReadmeDisplay: React.FC<ReadmeDisplayProps> = ({ username, repo, branch = 'main' }) => {
  const [readme, setReadme] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchReadme = async () => {
      try {
        setLoading(true);
        const content = await getReadme(username, repo, branch);
        setReadme(content);
        setError('');
      } catch (err) {
        setError('Failed to fetch README. Please try again.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchReadme();
  }, [username, repo, branch]);

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white shadow-lg rounded-lg p-6 max-w-4xl mx-auto mt-8"
    >
      <ReactMarkdown
        components={{
          h1: (props) => <h1 className="text-3xl font-bold mb-4" {...props} />,
          h2: (props) => <h2 className="text-2xl font-semibold mt-6 mb-3" {...props} />,
          h3: (props) => <h3 className="text-xl font-semibold mt-4 mb-2" {...props} />,
          p: (props) => <p className="mb-4" {...props} />,
          ul: (props) => <ul className="list-disc list-inside mb-4" {...props} />,
          ol: (props) => <ol className="list-decimal list-inside mb-4" {...props} />,
          li: (props) => <li className="mb-1" {...props} />,
          code: ({ inline, ...props }: React.HTMLProps<HTMLElement> & { inline?: boolean }) => 
            inline ? (
              <code className="bg-gray-100 rounded px-1" {...props} />
            ) : (
              <pre className="bg-gray-100 rounded p-4 overflow-x-auto">
                <code {...props} />
              </pre>
            ),
          blockquote: (props) => (
            <blockquote className="border-l-4 border-gray-300 pl-4 italic" {...props} />
          ),
          a: (props) => <a className="text-blue-500 hover:underline" {...props} />,
        }}
      >
        {readme}
      </ReactMarkdown>
    </motion.div>
  );
};

export default ReadmeDisplay;