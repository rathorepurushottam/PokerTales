import { Text, View } from "react-native";
import { AppSafeAreaView } from "../common/AppSafeAreaView";
import NavigationService from "../navigation/NavigationService";
import { HomeHeader } from "../common/HomeHeader";
import { colors } from "../theme/color";
import { AppText, FORTEEN, SIXTEEN } from "../common/AppText";
import FastImage from "react-native-fast-image";
import { pokerTextIcon, talesTextIcon } from "../helper/image";

const Home = () => {
  return (
    <AppSafeAreaView>
      <HomeHeader
        walletIcon={true}
        personClick={() => NavigationService.drawerAction()}
      />
      <View style={{flex: 1}}>
        <View
        style={{

            backgroundColor: colors.bannerBackColor,
            flex: 1,
            height: "30%",
            justifyContent: "space-evenly",
            alignItems: "center",

        }}
      >
        <FastImage source={pokerTextIcon} style={{height:"30%", width: "100%"}} resizeMode="contain" />
        <AppText style={{ color: "#FFFFFF1A" }} type={SIXTEEN}>BANNER HERE</AppText>
        <FastImage source={talesTextIcon} style={{height:"30%", width: "90%"}} resizeMode="contain" />
       
      </View>

      </View>
      
    </AppSafeAreaView>
  );
};

export default Home;
