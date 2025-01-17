import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { AppSafeAreaView } from "../common/AppSafeAreaView";
import { colors } from "../theme/color";
import Header from "../common/Header";
import {
  AppText,
  EIGHTEEN,
  FORTEEN,
  INTER_MEDIUM,
  INTER_SEMI_BOLD,
  MENUTEXT,
  TWELVE,
  WHITE,
} from "../common/AppText";
import LinearGradient from "react-native-linear-gradient";
import NavigationService from "../navigation/NavigationService";
import FastImage from "react-native-fast-image";
import { backIcon } from "../helper/image";
import { Logo, universalPaddingHorizontal } from "../theme/dimens";
import { Screen } from "react-native-screens";

const Legality = () => {
  return (
    <AppSafeAreaView>
      <LinearGradient
          colors={["#000000BD", "#0000005C", "#00000000", "#032146"]}
          style={[styles.header]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 0 }}
        >
          <TouchableOpacity
            style={styles.arrowview}
            onPress={() => {
              NavigationService.goBack();
            }}
          >
            <FastImage
              style={styles.arrowIcon}
              resizeMode="contain"
              source={backIcon}
              // tintColor={tintColor ? tintColor : colors.white}
            />
          </TouchableOpacity>
      
            <AppText
              color={WHITE}
              type={EIGHTEEN}
              weight={INTER_MEDIUM}
              style={styles.title}
            >
              {/* {'Legal Framework Governing Gaming in India'} */}
              {'Legality'}
            </AppText>
          
         
        </LinearGradient>
      <ScrollView style={{ flexGrow: 1, backgroundColor: colors.white }}>
        <View style={{ padding: 8 }}>
        <AppText type={FORTEEN} weight={INTER_SEMI_BOLD} color={MENUTEXT}>
        Legal Framework Governing Gaming in India
          </AppText>
          <AppText type={TWELVE} weight={INTER_MEDIUM} color={MENUTEXT}>
            The primary legislation governing gaming in India is the Public
            Gambling Act of 1867.
          </AppText>
          <AppText type={FORTEEN} weight={INTER_SEMI_BOLD} color={MENUTEXT}>
            Is Poker Legal in India?
          </AppText>
          <AppText
            type={TWELVE}
            weight={INTER_MEDIUM}
            color={MENUTEXT}
            style={{ marginVertical: 10 }}
          >
            Under Section 12 of the Public Gambling Act, 1867, games of mere
            skill are exempt from the Act's provisions. The Supreme Court of
            India, along with various High Courts, has interpreted a game of
            mere skill as one where, despite the inevitable presence of some
            chance, the outcome is primarily determined by the player's superior
            knowledge, training, focus, experience, and skill. In such games,
            the element of skill outweighs the element of chance, and no
            penalties can be imposed on individuals playing these games. Poker
            is considered a game of skill because it requires players to use
            psychological insight, knowledge of statistics and probability, and
            strategic thinking. Bets are made based on calculated odds and
            predictable outcomes, and the winner is determined by probability
            and a predominance of skill, not just luck. Additionally, the
            International Mind Sports Association (IMSA) recognizes poker as a
            'mind sport.' It’s important to note that, under the Indian
            Constitution, states have the authority to enact their own laws
            regulating betting and gambling within their jurisdictions. Several
            states have exercised these powers by enacting anti-gambling laws,
            which are generally aligned with the Public Gambling Act of 1867 and
            include an exception for "games of skill." However, where
            state-specific gambling legislation exists, it takes precedence over
            the Public Gambling Act of 1867. For example, the Assam Game and
            Betting Act, 1970, the Odisha (Prevention of) Gambling Act, 1955,
            the Telangana State Gaming (Amendment), and the Amendment to the
            Andhra Pradesh Gaming Act, 1974, all prohibit games involving money
            stakes and do not provide an exception for games of skill. As a
            result, residents of Andhra Pradesh, Assam, Odisha, Nagaland, and
            Telangana are currently not allowed to play on our site.
          </AppText>
        </View>
      </ScrollView>
    </AppSafeAreaView>
  );
};

export default Legality;

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    image: {
      flex: 1,
    },
    bottomContainer: {
      flexDirection: 'row',
      alignSelf: 'flex-start',
      padding: universalPaddingHorizontal,
      position: 'absolute',
    },
    header: {
      flexDirection: 'row',
      height: 70,
      width: "100%",
      paddingHorizontal: 10,
    //  justifyContent: "space-between",
      // marginTop: 30,
      // paddingHorizontal: universalPaddingHorizontal,
      alignItems: "center",
    },
    logo: {
      alignSelf: 'center',
      marginTop: Screen.Height / 16,
      height: Logo.Height,
      width: Logo.Width,
    },
    title: {
      marginLeft: 110,
      marginTop:2,
      // alignSelf: "center"
    },
    balance: {
      marginLeft: 100,
      marginTop:2,
      // alignSelf: "center"
    },
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
    arrowview:{
      height:38,
      width:38,
      marginTop:10,
    }
  });
  
