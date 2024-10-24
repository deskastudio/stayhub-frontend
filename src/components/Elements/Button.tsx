import React from "react";

interface ButtonProps {
  custom: string;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ custom, children }) => {
  return (
    <button className={`px-7 font-semibold font-main rounded-lg ${custom} text-white`}>
      {children}
    </button>
  );
};

export default Button;
