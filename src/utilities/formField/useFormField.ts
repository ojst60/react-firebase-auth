import { ChangeEvent, useState } from "react";
import { ZodSchema } from "zod";

interface UseFormFieldProps<T> {
  schema: ZodSchema<T>;
  initialValue?: T;
}

interface UseFormFieldResult<T> {
  /** value of input field */
  value: T;
  /** value of error */
  error?: string[];
  isValid: boolean;
  setValue: (value: T) => void;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  validate: () => boolean;
}

export default function useFormField<T>({
  initialValue,
  schema,
}: UseFormFieldProps<T>): UseFormFieldResult<T> {
  const [value, setValue] = useState<T>(initialValue as T);
  const [error, setError] = useState<string[]>([]);

  const isValid = schema.safeParse(value).success;

  function validate(): boolean {
    const result = schema.safeParse(value);
    if (!result.success) {
      setError(result.error.flatten().formErrors);
      return false;
    }
    setError([]);
    return true;
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const inputValue = e.target.value as unknown as T;
    setValue(inputValue);
    setError([]); // Clear error on input change
  }

  return {
    value,
    error,
    isValid,
    setValue,
    handleChange,
    validate,
  };
}
