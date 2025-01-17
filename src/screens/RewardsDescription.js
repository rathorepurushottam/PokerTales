import {
  Image,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { AppSafeAreaView } from "../common/AppSafeAreaView";
import Header from "../common/Header";
import { colors } from "../theme/color";
import { AppText, TEN } from "../common/AppText";
import FastImage from "react-native-fast-image";
import { rewardPageBanner1, dynamicDescImage, backIcon } from "../helper/image";
import NavigationService from "../navigation/NavigationService";
import { REWARDS_OPTIN_SCREEN } from "../navigation/routes";

const RewardsDescription = () => {
  return (
    <AppSafeAreaView statusColor={"#F5F5F5"} barStyle={"dark-content"}>
      <View
        style={{
          flex: 1,
          backgroundColor: colors.white,
        }}
      >
        <View>
          <TouchableOpacity
            style={{ position: "absolute", top: 10, zIndex: 999, left: 20 }}
            onPress={() => NavigationService.goBack()}
          >
            <FastImage
              source={backIcon}
              resizeMode="contain"
              style={{ width: 20, height: 20 }}
              tintColor={colors.black}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{ width: "100%", alignItems: "center" }}
            onPress={() => NavigationService.navigate(REWARDS_OPTIN_SCREEN)}
          >
            <FastImage
              source={rewardPageBanner1}
              resizeMode="cover"
              style={{ width: 500, height: 200 }}
            />
          </TouchableOpacity>
        </View>

        <View
          style={{ alignItems: "center", justifyContent:"center", flex: 1 }}
        >
          <FastImage
            source={dynamicDescImage}
            resizeMode="contain"
            style={{ width: 250, height: 100 }}
          />
        </View>
      </View>
    </AppSafeAreaView>
  );
};

export default RewardsDescription;

const styles = StyleSheet.create({
  bannerView: {
    height: 152,
    width: 390,
    borderWidth: 1,
    borderColor: "red",
    justifyContent: "center",
    alignItems: "center",
  },
});
