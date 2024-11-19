import React, { useRef, useState } from "react";

export interface Props {
  label: string;
  type: "text" | "email" | "password";
  value: string;
  onChange: (e:React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  name?: string;
  onFocus?: () => void;
  onBlur?: () => void;
  error?: string[];
}

export default function Textfield({
  label,
  type,
  value,
  onChange,
  disabled = false,
  name = label,
  error,
  onBlur,
  onFocus,
}: Props): JSX.Element {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleTogglePassword = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };



  return (
    <div className="w-full">
      <label className="text-gray-700 mb-1 block">{label}</label>
      <div
        className={`border-2 flex items-center h-12 px-2 rounded-md bg-gray-100 
          ${disabled ? "opacity-50 cursor-not-allowed" : "focus-within:border-[#3B82F6] focus-within:bg-[#F3F4F6]"} ${error && error[0] ? "focus-within:border-red-600 border-red-600": ""}
        `}
      >
        <input
          name={name}
          id={`${name}-input`}
          onFocus={onFocus}
          onBlur={onBlur}
          ref={inputRef}
          type={type === "password" && isPasswordVisible ? "text" : type}
          value={value}
          onChange={onChange}
          disabled={disabled}
          autoComplete="off"
          className="flex-grow bg-inherit focus:outline-none border-none"
          autoCapitalize="off"
          aria-autocomplete="none"
        />
        {type === "password" && (
          <span
            onClick={handleTogglePassword}
            className="text-blue-600 ml-2 focus:outline-none bg-inherit text-sm hover:cursor-pointer"
          >
            {isPasswordVisible ? "Hide" : "Show"}
          </span>
        )}
      </div>
      {error && error.length > 0 && error.map(err => (<p className="text-red-600 text-sm">{err}</p>))}
    </div>
  );
}
