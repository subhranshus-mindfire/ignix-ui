import type React from 'react';
import InputShowcase from '../components/input/InputShowcase';

const Input: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-900 via-indigo-900 to-blue-900 py-12">
      <InputShowcase />
    </div>
  );
};

export default Input;
