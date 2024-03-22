import React from "react";
import s from "./Button.module.css";

interface ButtonProps {
  onClick: () => void;
  className?: string; // To add additional styling 
  children: React.ReactNode;
  disabled?: boolean;
  type?: "main" | "";
}

const Button = ({
  onClick,
  className = "",
  children,
  disabled = false,
  type = "",
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`block ${
        type === "main" ? s.mainButton : s.secondaryButton
      } ${s.customButton} ${className}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
