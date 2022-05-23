interface InputProps {
  type: string;
  name: string;
  value: string;
  onChange: React.EventHandler<React.ChangeEvent<HTMLInputElement>>;
  placeholder?: string;
  className?: string;
}

export const Input = ({ type, name, value, onChange, ...args }: InputProps) => {
  const { ...props } = args;

  const inputStyles = `rounded-md px-2 py-1 focus:outline-none focus:shadow-outline-blue focus:border-blue-300`;

  return (
    <input
      className={`${inputStyles}`}
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      {...props}
    />
  );
};
