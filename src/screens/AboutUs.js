import { ScrollView, View } from "react-native";
import { AppSafeAreaView } from "../common/AppSafeAreaView";
import Header from "../common/Header";
import { colors } from "../theme/color";
import {
  AppText,
  FORTEEN,
  INTER_MEDIUM,
  INTER_SEMI_BOLD,
  MENUTEXT,
  TWELVE,
} from "../common/AppText";

const AboutUs = () => {
  return (
    <AppSafeAreaView>
      <Header commonHeader title={"About Us"} />
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, backgroundColor: colors.white }}
      >
        <View style={{ padding: 8 }}>
          {/* <AppText type={FORTEEN} weight={INTER_SEMI_BOLD} color={MENUTEXT}>
            About us :- As a premier online poker platform, we
            blend competitive gaming with cutting-edge technology to bring you a
            seamless and thrilling poker experience.
          </AppText> */}
          <AppText
            type={TWELVE}
            weight={INTER_MEDIUM}
            color={MENUTEXT}
            style={{ marginVertical: 10 }}
          >
            At Poker Tales, poker is more than just a game – it’s a passion. Our
            platform caters to everyone, from seasoned pros chasing high-stakes
            action to beginners discovering the world of online poker.
          </AppText>
          <AppText
            type={TWELVE}
            weight={INTER_MEDIUM}
            color={MENUTEXT}
            style={{ marginVertical: 10 }}
          >
            We pride ourselves on building a vibrant poker community. With
            exciting tournaments, unique events, and engaging promotions, Poker
            Tales keeps the action alive and inclusive for all players.
          </AppText>
          <AppText
            type={TWELVE}
            weight={INTER_MEDIUM}
            color={MENUTEXT}
            style={{ marginVertical: 10 }}
          >
            What sets us apart? Innovation and excellence. Our secure,
            user-friendly platform delivers smooth gameplay, stunning visuals,
            and a fair environment, letting you focus on the game you love.
          </AppText>
          <AppText
            type={TWELVE}
            weight={INTER_MEDIUM}
            color={MENUTEXT}
            style={{ marginVertical: 10 }}
          >
            Join Poker Tales today and make every hand a story worth telling.
            Your poker journey starts here.
          </AppText>
        </View>
      </ScrollView>
    </AppSafeAreaView>
  );
};

export default AboutUs;
