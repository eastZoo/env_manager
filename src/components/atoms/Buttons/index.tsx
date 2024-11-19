import * as S from "./buttons.styles";

export interface ButtonProps {
  type?: "button" | "submit" | "reset" | undefined;
  label?: string;
  color?: string;
  size?: "sm" | "md" | "lg" | "full";
  disabled?: boolean;
  children?: React.ReactNode;
  onClick?: any;
}

export const Button = ({
  type,
  label,
  color,
  size,
  disabled,
  children,
  onClick,
}: ButtonProps) => {
  return (
    <S.ButtonBox
      type={type}
      color={color}
      size={size}
      onClick={onClick}
      disabled={disabled}
    >
      {children && children}
      {label && label}
    </S.ButtonBox>
  );
};
