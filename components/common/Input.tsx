import { forwardRef } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

export interface InputProps {
  type?: string;
  name?: string;
  value?: string;
  placeholder?: string;
  register?: UseFormRegisterReturn;
  [x: string]: any;
}

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { type, name, value, placeholder, register } = props;
  // const inputStyles = `rounded-md px-2 py-1 border-gray-500 border-[1px]`;
  // const inputStyles = `rounded-md border-[1px] py-21 border-gray-500`;
  const inputStyles = `appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`;
  // const inputStyles = `shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md`;

  return (
    <div>
      <input
        className={`${inputStyles}`}
        {...register}
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        {...props}
      />
    </div>
  );
});

export default Input;
