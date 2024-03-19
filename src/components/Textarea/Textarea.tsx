import React from "react";

interface TextareaProps {
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}
const Textarea = ({ placeholder = "", value, onChange }: TextareaProps) => {
  return (
    <textarea
      className="p-2 mb-2 border-2 border-solid border-zinc-300 outline-none focus-visible:border-zinc-700 rounded-md duration-500 resize-none w-full focus-visible:border-zinc-700"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
};

export default Textarea;
