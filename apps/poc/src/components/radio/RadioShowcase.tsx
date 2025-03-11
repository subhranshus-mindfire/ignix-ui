import type React from 'react';
import AnimatedRadio from './AnimatedRadio';

const options = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
  { value: 'option4', label: 'Option 4' },
];

const RadioShowcase: React.FC = () => {
  const variants = [
    'clean',
    'bounce',
    'elastic',
    'wave',
    'ripple',
    'pulse',
    'rotate3D',
    'magnetic',
  ];

  return (
    <div className="max-w-6xl mx-auto mt-10 p-8 bg-white rounded-xl shadow-lg">
      <h1 className="text-3xl font-bold text-center mb-12 text-gray-800">Radio Animations</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {variants.map((variant) => (
          <div
            key={variant}
            className="p-6 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
          >
            <h2 className="text-lg font-medium mb-4 text-gray-700 capitalize">{variant}</h2>
            <AnimatedRadio
              options={options}
              variant={variant}
              className="text-gray-700"
              onValueChange={(value) => console.log(`Selected value for ${variant}: ${value}`)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RadioShowcase;
