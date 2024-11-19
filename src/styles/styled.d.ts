import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    gradient: {
      skeleton: string;
      gradientGauge: string;
    };
    shadow: {
      primary: string;
      box: string;
      navigation: string;
      btn: string;
      modal: string;
    };
    colors: {
      // PALETTE
      [primary: string]: string;
      [primaryActive: string]: string;
      [secondary: string]: string;
      [secondaryActive: string]: string;
      [highlight: string]: string;
      [highlightActive: string]: string;

      white: string;
      whiteActive: string;
      black: string;
      gray: string;
      lightGray: string;
      checkBox: string;

      // TEXT
      labelTxt: string;
      contentLabelTxt: string;
      contentTxt: string;
      placeholderTxt: string;

      // BORDER
      linkBtnBorder: string;
      divideBorder: string;
      itemExpborder: string;

      // BACKGROUND
      mainBg: string;
      tagBg: string;
      whiteBg: string;
      handleBg: string;
      skeleton: string;
      checkBoxBg: string;
      cameraBg: string;

      // LAYOUT

      // INPUT
      inputBg: string;
      inputBorder: string;
      inputActiveBorder: string;
      inputDisabledBg: string;
      checkBoxBorder: string;

      //GRID
      grid: string;
    };
  }
}
