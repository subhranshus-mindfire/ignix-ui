import type React from 'react';
import TextareaShowcase from '../components/textarea/TextareaShowcase';

const Textarea: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-900 via-indigo-900 to-blue-900 py-12">
      <TextareaShowcase />
    </div>
  );
};

export default Textarea;
