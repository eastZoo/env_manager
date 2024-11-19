import { DefaultTheme } from "styled-components";

export const theme: DefaultTheme = {
  gradient: {
    skeleton:
      "linear-gradient(120deg, #e5e5e5 30%, #f0f0f0 38%, #f0f0f0 40%, #e5e5e5 48%)",
    gradientGauge:
      "linear-gradient(90deg, #54DC9D 0%, #FFCD2E 36.98%, #FF9726 63.02%, #EE2A59 100%)",
  },
  shadow: {
    primary: "0 2px 6px -3px rgba(0,0,0,0.1)",
    box: "0 -2px 20px -4px rgba(0,0,0,0.1)",
    navigation: "0px 10px 2px -2px rgba(0,0,0, 0.2)",
    btn: "0 2px 2px 1px rgba(0,0,0,0.1)",
    modal: "0 2px 6px -3px rgba(0,0,0,0.3)",
  },
  colors: {
    // PALETTE
    primary: "#FAC94A",
    primary100: "#181818",
    primary60: "#1f1f1f",
    primary50: "#2B2B2B",
    primaryActive: "#FFBC14FF",
    secondary: "#00DEAB",
    secondaryActive: "#00BA9E",
    highlight: "#8F8DF0",
    highlightActive: "rgba(143, 141, 240, 0.2)",

    white: "#ffffff",
    whiteActive: "#F6F8FD",
    black: "#000000",
    gray: "#676767",
    lightGray: "#f0f0f0",
    camerFont: "#C6C6C6",
    checkBox: "#A8A8A8",
    disabledBtn: "#E8E8E8",
    red: "#D71D5D",

    // TEXT
    labelTxt: "#6B6B6B",
    contentLabelTxt: "#878787",
    contentTxt: "#1F1F1F",
    placeholderTxt: "#ABABAB",

    // BORDER
    linkBtnBorder: "#F2F3FC",
    divideBorder: "#EDEEF3",
    itemExpborder: "#F2F3FC",

    // BACKGROUND
    mainBg: "#FAFAFA",
    tagBg: "#3C3C3C",
    whiteBg: "#FFFFFF",
    handleBg: "#EEEEEE",
    skeleton: "#e5e5e5",
    checkBoxBg: "#165EF310",
    cameraBg: "#F0F0F0",
    homeStepBg: "#00BAAF",

    // LAYOUT

    // INPUT
    inputBg: "#1f1f1f",
    inputBorder: "#D9D9D9",
    inputActiveBorder: "#1D4ED7",
    inputDisabledBg: "#DFDFDF",
    checkBoxBorder: "#E0E0E0",

    //GRID
    grid: "#364964",
  },
};
