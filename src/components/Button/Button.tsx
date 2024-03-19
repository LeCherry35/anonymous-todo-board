import React from "react";

interface ButtonProps {
  onClick: () => void;
  styleAdd?: string;
  children: React.ReactNode;
  disabled?: boolean;
  type?: "main" | "";
}

const Button = ({
  onClick,
  styleAdd = "",
  children,
  disabled = false,
  type = "",
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`block ${
        type === "main" ? "bg-orange-600" : "bg-orange-400"
      } py-1 px-2 rounded-md text-white disabled:bg-zinc-200 enabled:hover:scale-110 enabled:active:scale-90 duration-500 ${styleAdd}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
