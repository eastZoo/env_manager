import React from "react";
import { GlobalStyle } from "../styles/global-style";
import { GlobalFonts } from "../styles/assets/fonts/fonts";

interface GlobalStyleProviderProps {
  children: React.ReactElement;
}

export const GlobalStyleProvider = ({ children }: GlobalStyleProviderProps) => {
  return (
    <>
      <GlobalStyle />
      <GlobalFonts />
      {children}
    </>
  );
};
