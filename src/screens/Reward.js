import { StatusBar, StyleSheet, TouchableOpacity, View } from "react-native";
import { AppSafeAreaView } from "../common/AppSafeAreaView";
import Header from "../common/Header";
import { colors } from "../theme/color";
import { AppText, TEN } from "../common/AppText";
import FastImage from "react-native-fast-image";
import { rewardPageBanner1, rewardPageBanner2 } from "../helper/image";
import NavigationService from "../navigation/NavigationService";
import { REWARDS_DESCRIPTION_SCREEN } from "../navigation/routes";

const Reward = () => {
  return (
    <AppSafeAreaView statusColor={"#032146"}>
      <Header commonHeader title={"Rewards"} style={{ marginTop: 30 }} />
      <View
        style={{
          flex: 1,
          backgroundColor: colors.white,
          alignItems: "center",
          paddingHorizontal: 20,
        }}
      >
        <TouchableOpacity onPress={() =>  NavigationService.navigate(REWARDS_DESCRIPTION_SCREEN)}>
          <FastImage
            source={rewardPageBanner1}
            resizeMode="center"
            style={{ width: 390, height: 152, marginVertical: 10 }}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() =>  NavigationService.navigate(REWARDS_DESCRIPTION_SCREEN)}>
          <FastImage
            source={rewardPageBanner1}
            resizeMode="center"
            style={{ width: 390, height: 152 }}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() =>  NavigationService.navigate(REWARDS_DESCRIPTION_SCREEN)}>
          <FastImage
            source={rewardPageBanner2}
            resizeMode="center"
            style={{ width: 390, height: 152, marginVertical: 10 }}
          />
        </TouchableOpacity>
      </View>
    </AppSafeAreaView>
  );
};

export default Reward;

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
