interface InputProps {
  type: string;
  name: string;
  value?: string;
  id: string;
  autoComplete?: string;
  placeholder?: string;
  className?: string;
  onChange?: React.EventHandler<React.ChangeEvent<HTMLInputElement>>;
}

export const Input = ({ type, name, value, onChange, ...args }: InputProps) => {
  const { ...props } = args;

  // const inputStyles = `rounded-md px-2 py-1 border-gray-500 border-[1px]`;
  // const inputStyles = `rounded-md border-[1px] py-21 border-gray-500`;
  const inputStyles = `appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`;
  // const inputStyles = `shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md`;

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

export default Input;
