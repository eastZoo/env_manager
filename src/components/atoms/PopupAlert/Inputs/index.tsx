import * as S from "./inputs.styles";

export interface InputLayoutProps {
  placeholder?: string;
  size?: "sm" | "md" | "lg" | "full";
  children?: React.ReactNode;
  name?: string;
  className?: string;
}

export const Input = ({
  placeholder,
  size,
  children,
  name,
  className,
}: InputLayoutProps) => {
  return (
    <S.InputBox>
      <S.InputBorder size={size}>
        {children}
        <S.InputLabel htmlFor={name}>{placeholder}</S.InputLabel>
      </S.InputBorder>
    </S.InputBox>
  );
};
