import { StyleSheet } from "react-native";
import { colors } from "../../theme/color";

const styles = StyleSheet.create({
  topContainer: {
    height: 70,
    width: "100%",
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    // justifyContent: "space-between",
  },

  personImage: {
    height: 40,
    width: 40,
    borderRadius: 100,
    // marginLeft: 20,
    borderWidth: 1,
    borderColor: colors.brownYellow,
  },

  userfilter: {
    position: "absolute",
    alignSelf: "flex-end",
    top: 26,
    left: 25,
    backgroundColor: colors.white,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.green,
    width: 15,
    height: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  arrowview:{
    height:38,
    width:38,
    backgroundColor:"transparent",
    alignItems:"center",
    justifyContent:"center",
  },
  arrowIcon: {
    height: 24,
    width: 24,
  },
});

export default styles;
