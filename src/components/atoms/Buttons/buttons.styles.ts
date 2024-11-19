import styled, { css } from "styled-components";
import { ButtonProps } from ".";

export const ButtonBox = styled.button<ButtonProps>`
  display: flex;
  color: ${(props) =>
    props.color === "white"
      ? props.theme.colors.primary
      : props.color === "transparent"
      ? props.theme.colors.primary
      : props.color === "transparentGray"
      ? props.theme.colors.gray
      : props.theme.colors.white};
  background: ${(props) =>
    props.color === "transparent" || props.color === "transparentGray"
      ? "none"
      : props.color
      ? props.theme.colors[props.color]
      : props.theme.colors.primary};
  border: none;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  gap: 4px;

  &:active {
    background: ${(props) =>
      props.color === "transparent"
        ? props.theme.colors.whiteActive
        : props.color
        ? props.theme.colors[props.color + "Active"]
        : props.theme.colors.primaryActive};
  }

  ${(props) =>
    props.size === "full" &&
    css`
      width: 100%;
      height: 54px;
      font-size: 1.8rem;
      font-weight: 600;
    `}

  ${(props) =>
    props.size === "sm" &&
    css`
      width: auto;
      min-width: 60px;
      height: 30px;
      padding: 0 8px;
      font-size: 1.4rem;
      font-weight: 600;
    `}

  :disabled {
    color: ${(props) => props.theme.colors.white};
    background: ${(props) => props.theme.colors.inputBorder};
  }
`;
