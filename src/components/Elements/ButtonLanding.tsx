import React from "react";

interface ButtonProps {
  custom: string;
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({
  custom,
  children,
  type = "button",
  onClick,
}) => {
  return (
    <button
      type={type}
      onClick={onClick} // Pastikan onClick disertakan di sini
      className={`px-7 font-semibold font-main rounded-lg ${custom}`}
    >
      {children}
    </button>
  );
};

export default Button;
