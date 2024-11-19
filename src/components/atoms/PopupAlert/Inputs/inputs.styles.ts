import styled, { css } from "styled-components";
import { InputLayoutProps } from ".";

export const InputBox = styled.div`
  position: relative;
  width: 100%;
`;

export const InputLabel = styled.label`
  position: absolute;
  padding: 0 2px;
  top: calc(50% - 0.9rem);
  left: 14px;
  color: ${(props) => props.theme.colors.placeholderTxt};
  font-size: 1.7rem;
  letter-spacing: 0.2rem;
  transition: all 0.2s;
  z-index: 10;

  &::before {
    content: "";
    position: absolute;
    width: 100%;
    height: 4px;
    left: 0;
    top: 7px;
    z-index: -1;
  }
`;

export const InputBorder = styled.div<InputLayoutProps>`
  input {
    padding: 0 12px;
    font-size: 1.4rem;
    background: ${(props) => props.theme.colors.inputBg};
    border-radius: 10px;
    border: 1px solid ${(props) => props.theme.colors.inputBorder};
    outline: none;
    transition: all 0.3s;
    color: #fac94a;

    &:-webkit-autofill {
      box-shadow: 0 0 0px 1000px #1f1f1f inset;
      -webkit-text-fill-color: #fac94a;
      transition: background-color 5000s ease-in-out 0s;
    }

    // input hover 전 비활성화 label 색상
    & + ${InputLabel} {
      top: -8px;
      left: 12px;
      font-size: 1.4rem;
      font-weight: 600;
      border: 1px;
      color: ${(props) => props.theme.colors.contentLabelTxt};
    }

    &:focus {
      border: 3px solid ${(props) => props.theme.colors.primary};

      & + ${InputLabel} {
        top: -24px;
        left: 12px;
        font-size: 1.4rem;
        font-weight: 600;
        color: ${(props) => props.theme.colors.primary};
      }
    }
  }

  ${(props) =>
    props.size === "full" &&
    css`
      input {
        width: 100%;
        height: 54px;
      }
    `}
`;

export const InputTypeBox = styled.div`
  position: relative;
  display: flex;
  align-items: center;

  // 콤보박스
  select {
    width: 100%;
    height: 100%;
    font-size: 1.8rem;
    color: ${(props) => props.theme.colors.black};
    background: none;

    border: 1px solid ${(props) => props.theme.colors.inputBorder};
    border-radius: 4px;
    padding: 16px;

    &.defaultValue {
      color: ${(props) => props.theme.colors.contentLabelTxt};
    }

    &:focus {
      border: 1px solid ${(props) => props.theme.colors.primary};
      color: ${(props) => props.theme.colors.primary};
    }
  }

  .arrowDiv {
    height: fit-content;
    position: absolute;
    right: 18px;
  }
`;
