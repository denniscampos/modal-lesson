interface HeadingProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

export default function Heading({ children, className, variant, ...props }: HeadingProps) {
  return (
    <h1 className={`${getVariant(variant)} ${className || ''}`} {...props}>
      {children}
    </h1>
  );
}

function getVariant(variant: HeadingProps['variant']) {
  // these are temporary headings until we have proper configuration.
  switch (variant) {
    case 'h1':
      return `text-6xl`;
    case 'h2':
      return `text-5xl`;
    case 'h3':
      return `text-2xl`;
    case 'h4':
      return `text-xl font-bold`;
    case 'h5':
      return `text-base`;
    case 'h6':
      return `text-sm`;
    default:
      return '';
  }
}
