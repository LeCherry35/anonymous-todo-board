import React from "react";
import s from "./Input.module.css";

interface InputProps {
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  className?: string; // To add additional
}
const Input = ({
  placeholder = "",
  value,
  onChange,
  disabled = false,
  className = "",
}: InputProps) => {
  return (
    <input
      className={s.customInput +' ' + className}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      disabled={disabled}
    />
  );
};

export default Input;
