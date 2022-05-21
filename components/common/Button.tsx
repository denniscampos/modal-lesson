import React from 'react';

export type ButtonProps = {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'tertiary' | 'quaternary' | 'quinary';
  onClick?: () => void; //keep an eye on this..
  disabled?: boolean;
  className?: string;
};

const Button = ({ children, variant, className, ...args }: ButtonProps) => {
  const { ...props } = args;

  return (
    <button className={`${getVariant(variant)} ${className || ''}`} {...props}>
      {children}
    </button>
  );
};

function getVariant(variant: ButtonProps['variant']) {
  const commonStyles = `rounded-md px-3 py-2 text-white`;

  switch (variant) {
    case 'primary':
      return `${commonStyles} bg-primary hover:bg-secondary`;
    case 'secondary':
      return `${commonStyles} bg-secondary`;
    default:
      return '';
  }
}

export default Button;
