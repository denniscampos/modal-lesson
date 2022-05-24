interface LabelProps {
  children: React.ReactNode;
  for: string;
  className?: string;
}

const Label = ({ children, className, ...args }: LabelProps) => {
  const { ...props } = args;

  const labelStyles = `text-primary text-sm font-bold`;

  return (
    <div>
      <label className={`${labelStyles} ${className}`} {...props}>
        {children}
      </label>
    </div>
  );
};

export default Label;
