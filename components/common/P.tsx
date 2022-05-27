interface ParagraphProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'p1' | 'p2' | 'p3';
}

export default function P({ variant, children, ...props }: ParagraphProps) {
  return (
    <p className={`${getVariant(variant)}`} {...props}>
      {children}
    </p>
  );
}

function getVariant(variant: ParagraphProps['variant']) {
  switch (variant) {
    case 'p1':
      return 'text-base';
    case 'p2':
      return 'text-md';
    case 'p3':
      return 'text-sm';
  }
}
