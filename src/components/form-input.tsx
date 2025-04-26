import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = '', error, ...rest }, ref) => {
    return (
      <div className="w-full">
        <input
          ref={ref}
          className={`w-full p-2 rounded-md border-2 bg-primary text-textmain outline-none min-w-0 focus:border-accent ${
            error ? 'border-danger' : 'border-buttonhover'
          } ${className}`}
          {...rest}
        />
        {error && <div className="text-danger text-xs mt-1 mb-1">{error}</div>}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
