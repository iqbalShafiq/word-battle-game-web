import React from 'react';

/**
 * Button component for consistent button styling and behavior.
 * @param children - The content inside the button.
 * @param className - Additional class names for styling.
 * @param rest - Other button props (onClick, type, disabled, etc).
 */
const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({
  children,
  className = '',
  ...rest
}) => {
  return (
    <button
      className={`bg-button cursor-pointer text-secondary rounded-md px-4 py-2 font-bold text-base whitespace-nowrap transition-colors disabled:bg-disabled disabled:text-textdisabled hover:bg-buttonhover ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
