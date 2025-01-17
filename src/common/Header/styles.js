import { StyleSheet } from "react-native";

import { Logo, Screen, universalPaddingHorizontal } from "../../theme/dimens";
import { colors } from "../../theme/color";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
  },
  bottomContainer: {
    flexDirection: "row",
    alignSelf: "flex-start",
    padding: universalPaddingHorizontal,
    position: "absolute",
  },
  header: {
    flexDirection: "row",
    height: 45,
    width: "100%",
    // paddingVertical: 5,
    paddingHorizontal: 20,
    justifyContent: "space-between",
    alignItems: "center",
  },
  logo: {
    alignSelf: "center",
    marginTop: Screen.Height / 16,
    height: Logo.Height,
    width: Logo.Width,
  },
  title: {},
  balance: {},
  arrow: {
    height: 18,
    width: 18,
  },
  arrowIcon: {
    height: 24,
    width: 24,
  },
  walletIcon: {
    height: 18,
    width: 18,
  },
  arrowview: {
    width: "33.33%",
    justifyContent: "center",
    alignItems: "flex-start",
  },
});

export default styles;
