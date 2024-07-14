import { BackHandler, Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

export const COLORS = {
  background: "#031F28",
  primary: "#E65100",
  secondary: "#D6D202",
  tertiary: "#263238",
  white: "#FFFFFF",
  gray: "#F0F5FA",
  black: "#32343E",
};

export const SIZES = {
  base: 8,
  font: 14,
  radius: 30,
  padding: 8,
  padding2: 12,
  padding3: 16,

  largeTitle: 50,
  h1: 30,
  h2: 22,
  h3: 20,
  h4: 18,
  body1: 30,
  body2: 22,
  body3: 20,
  body4: 18,

  width,
  height,
};

export const FONTS = {
  largeTitle: {
    fontFamily: "bold",
    fonstSize: SIZES.largeTitle,
    lineHeight: 55,
  },

  h1: { fontFamily: "bold", fonstSize: SIZES.h1, lineHeight: 36 },
  h2: { fontFamily: "bold", fonstSize: SIZES.h2, lineHeight: 30 },
  h3: { fontFamily: "bold", fonstSize: SIZES.h3, lineHeight: 22 },
  h4: { fontFamily: "bold", fonstSize: SIZES.h4, lineHeight: 20 },

  body1: { fontFamily: "regular", fonstSize: SIZES.body1, lineHeight: 36 },
  body2: { fontFamily: "regular", fonstSize: SIZES.body2, lineHeight: 30 },
  body3: { fontFamily: "regular", fonstSize: SIZES.body3, lineHeight: 22 },
  body4: { fontFamily: "regular", fonstSize: SIZES.body4, lineHeight: 20 },
};

const appTheme = { COLORS, SIZES, FONTS };

export default appTheme;
