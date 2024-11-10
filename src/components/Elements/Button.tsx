import React from 'react';

interface ButtonProps {
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  variant?: "primary" | "secondary" | "disabled" | "plain" | "underlined" | "tertiary";
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ type = "button", onClick, variant = "primary", children }) => {
  const baseClass = "py-2 px-4 rounded font-semibold";
  
  // Variants with specific styles
  const variantClass = {
    primary: "bg-primary text-white hover:bg-primary-dark",
    secondary: "bg-transparent border border-primary-dark text-[#515151] text-sm",
    disabled: "bg-gray-300 text-gray-700 cursor-not-allowed",
    plain: "bg-transparent text-blue-500 border border-blue-500 hover:bg-blue-100",
    underlined: "bg-transparent text-blue-500 underline hover:text-blue-700 text-primary-dark", // Use underline for text
    tertiary: "bg-white text-primary-dark hover:text-primary-dark",
  };

  return (
    <button
      type={type}
      onClick={variant !== "disabled" ? onClick : undefined} // Disable onClick for disabled button
      className={`${baseClass} ${variantClass[variant]}`}
      disabled={variant === "disabled"} // Disable the button when "disabled"
    >
      {children}
    </button>
  );
};

export default Button;
