import type React from 'react';
import AnimatedTextarea from './AnimatedTextarea';

const TextareaShowcase: React.FC = () => {
  const variants = [
    'clean',
    'expandable',
    'smoothExpand',
    'glowBorder',
    'characterCount',
    'lineHighlight',
    'typewriterSound',
    'markdownPreview',
    'autoComplete',
    'syntaxHighlight',
    'rippleEffect',
    'gradientBorder',
    'neonGlow',
    'particleField',
    'elastic',
    'wave',
    'spotlight',
    'liquid',
    'cosmic',
    'hologram',
  ];

  return (
    <div className="max-w-6xl mx-auto mt-10 p-8 bg-white rounded-xl shadow-lg">
      <h1 className="text-3xl font-bold text-center mb-12 text-gray-800">Textarea Animations</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {variants.map((variant) => (
          <div
            key={variant}
            className="p-6 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
          >
            <h2 className="text-lg font-medium mb-4 text-gray-700 capitalize">{variant}</h2>
            <AnimatedTextarea
              placeholder="Type your message..."
              variant={variant}
              textareaClassName="text-gray-700 border-gray-200 focus:border-blue-500"
              labelClassName="text-gray-500"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TextareaShowcase;
