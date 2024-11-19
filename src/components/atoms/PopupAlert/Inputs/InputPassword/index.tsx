import { UseFormRegisterReturn } from "react-hook-form";
import { Input } from "..";
import * as S from "../inputs.styles";

interface InputPasswordProps {
  label?: string;
  name?: string;
  placeholder?: string;
  size?: "sm" | "md" | "lg" | "full";
  register?: UseFormRegisterReturn;
  required?: boolean;
}

export const InputPassword = ({
  label,
  name,
  placeholder,
  size,
  register,
  required,
}: InputPasswordProps) => {
  return (
    <Input size={size} placeholder={label} name={name}>
      <input
        type="password"
        id={name}
        placeholder={placeholder}
        autoComplete="off"
        required={required}
        {...register}
      />
    </Input>
  );
};
