import { UseFormRegisterReturn } from "react-hook-form";
import { Input } from "..";

interface InputTextProps {
  label?: string;
  name?: string;
  placeholder?: string;
  size?: "sm" | "md" | "lg" | "full";
  register?: UseFormRegisterReturn;
  required?: boolean;
  signUp?: string;
}

export const InputText = ({
  label,
  name,
  placeholder,
  size,
  register,
  required,
  signUp,
}: InputTextProps) => {
  return (
    <Input size={size} placeholder={label} name={name}>
      <input
        type="text"
        id={name}
        placeholder={placeholder}
        required={required}
        autoCapitalize="none"
        autoComplete="off"
        {...register}
      />
    </Input>
  );
};
