import { Link } from 'react-router-dom';

interface ButtonProps {
  custom: string;
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  to?: string;
}

const Button: React.FC<ButtonProps> = ({
  custom,
  children,
  type = 'button',
  onClick,
  to,
}) => {
  if (to) {
    return (
      <Link
        to={to}
        className={`px-7 font-semibold font-main rounded-lg ${custom}`}
      >
        {children}
      </Link>
    );
  }

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
