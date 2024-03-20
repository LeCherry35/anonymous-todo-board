import React from "react";

interface InputProps {
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  styleAdd?: string;
}
const Input = ({
  placeholder = "",
  value,
  onChange,
  disabled = false,
  styleAdd = "",
}: InputProps) => {
  return (
    <input
      className={`p-2 border-2 border-solid border-zinc-300 outline-none rounded-md mb-2 focus-visible:border-zinc-700 duration-500 ${styleAdd}`}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      disabled={disabled}
    />
  );
};

export default Input;
