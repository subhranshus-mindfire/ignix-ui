import type React from 'react';
import AnimatedInput from './AnimatedInput';

// Add this CSS to your styles
const styles = `
  @keyframes float {
    0% { transform: translateY(0) scale(1); opacity: 1; }
    100% { transform: translateY(-20px) scale(0); opacity: 0; }
  }
  .particle {
    animation: float 1s ease-out forwards;
  }
`;

const InputShowcase: React.FC = () => {
  const variants = [
    'clean',
    'underline',
    'floating',
    'borderGlow',
    'shimmer',
    'particles',
    'borderBeam',
    'gradientBorder',
    'ripple',
    'materialFloat',
    'neonPulse',
    'typewriterReveal',
    'morphing',
    'spotlight',
    'liquidBorder',
    'particleField',
    // Add more variants here...
  ];

  return (
    <>
      <style>{styles}</style>
      <div className="max-w-6xl mx-auto mt-10 p-8 bg-white rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-12 text-gray-800">Input Animations</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {variants.map((variant) => (
            <div
              key={variant}
              className="p-6 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <h2 className="text-lg font-medium mb-4 text-gray-700 capitalize">{variant}</h2>
              <AnimatedInput
                placeholder={`Type something...`}
                variant={variant}
                inputClassName="text-gray-700 border-gray-200 focus:border-blue-500"
                labelClassName="text-gray-500"
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default InputShowcase;
