import React from 'react';

/**
 * Input component for consistent input styling and behavior.
 * @param className - Additional class names for styling.
 * @param rest - Other input props (type, value, onChange, etc).
 */
const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = ({
  className = '',
  ...rest
}) => {
  return (
    <input
      className={`flex-1 p-2 rounded-md border-2 border-buttonhover bg-primary text-textmain outline-none min-w-0 focus:border-accent ${className}`}
      {...rest}
    />
  );
};

export default Input;
