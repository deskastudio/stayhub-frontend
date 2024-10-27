import React from "react";

interface ButtonProps {
  custom: string;
  children: React.ReactNode;
  type?: "button" | "submit" | "reset"; 
}

const Button: React.FC<ButtonProps> = ({ custom, children, type = "button" }) => { 
  return (
    <button type={type} className={`px-7 font-semibold font-main rounded-lg ${custom} text-white`}>
      {children}
    </button>
  );
};

export default Button;
