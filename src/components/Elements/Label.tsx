import React from 'react';

interface LabelProps {
  htmlFor: string;
  children: React.ReactNode;
}

const Label: React.FC<LabelProps> = ({ htmlFor, children }) => {
  return (
    <label htmlFor={htmlFor} className="block mb-2 text-lg text-gray-600 font-bold">
      {children}
    </label>
  );
};

export default Label;
