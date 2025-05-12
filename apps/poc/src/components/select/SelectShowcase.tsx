import type React from 'react';
import AnimatedSelect from './AnimatedSelect';

const options = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
  { value: 'option4', label: 'Option 4' },
];

const SelectShowcase: React.FC = () => {
  const variants = ['clean', 'cascade', 'scale', 'elastic', 'slide', 'fade'];

  return (
    <div className="max-w-6xl mx-auto mt-10 p-8 bg-white rounded-xl shadow-lg">
      <h1 className="text-3xl font-bold text-center mb-12 text-gray-800">Select Animations</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {variants.map((variant) => (
          <div
            key={variant}
            className="p-6 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
          >
            <h2 className="text-lg font-medium mb-4 text-gray-700 capitalize">{variant}</h2>
            <AnimatedSelect
              options={options}
              placeholder="Select an option..."
              variant={variant}
              selectClassName="text-gray-700"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelectShowcase;
