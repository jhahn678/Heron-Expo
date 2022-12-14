import { StyleSheet } from "react-native";

export const DEFAULT_BACKGROUND = 'rgb(242, 242, 242)';

export default StyleSheet.create({
  frsb: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  baseline: {
    flexDirection: "row",
    alignItems: "baseline",
  },
  frac: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  frr: {
    display: 'flex',
    flexDirection: 'row-reverse'
  }
});