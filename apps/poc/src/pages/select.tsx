import type React from 'react';
import SelectShowcase from '../components/select/SelectShowcase';

const Select: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-900 via-indigo-900 to-blue-900 py-12">
      <SelectShowcase />
    </div>
  );
};

export default Select;
