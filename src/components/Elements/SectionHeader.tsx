import React from 'react';

interface SectionHeaderProps {
  title: string;
  children?: React.ReactNode;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title, children }) => {
  return (
    <div className='flex justify-between items-center mb-6'>
      <h1 className='text-2xl font-bold'>{title}</h1>
      {children}
    </div>
  );
};

export default SectionHeader;
