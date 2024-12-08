import React from "react";

interface TextInputProps {
  value: string;
  onChange: (value: string) => void;
  type: string;
}

const TextInput: React.FC<TextInputProps> = ({ value, onChange, type }) => {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md"
    />
  );
};

export default TextInput;
