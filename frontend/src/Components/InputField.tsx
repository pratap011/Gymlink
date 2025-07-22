import React from 'react';

interface InputFieldProps {
  label: string;
  type?: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const InputField: React.FC<InputFieldProps> = ({
  label,
  type = 'text',
  name,
  value,
  onChange,
}) => (
  <div className="mb-4">
    <label className="block mb-1 text-sm font-medium text-white">
      {label}
    </label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>
);
