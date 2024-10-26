import React from 'react';

interface IconProps {
  name: string;
  className?: string;
}

const Icon: React.FC<IconProps> = ({ name, className }) => {
  return (
    <i className={`${className} material-icons`}>{name}</i>
  );
};

export default Icon;
