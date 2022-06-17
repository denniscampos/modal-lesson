import React from 'react';

export type ButtonProps = {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'tertiary' | 'quaternary' | 'quinary' | 'danger';
  onClick?: () => void; //keep an eye on this..
  disabled?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
};

const Button = ({ children, variant, className, type, ...args }: ButtonProps) => {
  const { ...props } = args;

  return (
    <div>
      <button className={`${getVariant(variant)} ${className || ''}`} type={type} {...props}>
        {children}
      </button>
    </div>
  );
};

function getVariant(variant: ButtonProps['variant']) {
  const commonStyles = `rounded-md px-3 py-2 text-white`;

  switch (variant) {
    case 'primary':
      return `${commonStyles} bg-primary hover:bg-medium-primary disabled:opacity-20 disabled:pointer-events-none`;
    case 'secondary':
      return `${commonStyles} bg-secondary disabled:opacity-20 disabled:pointer-events-none`;
    case 'danger':
      return `${commonStyles} bg-danger disabled:opacity-20 disabled:pointer-events-none`;
    default:
      return '';
  }
}

export default Button;
