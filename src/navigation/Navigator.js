import React, { createContext, useEffect, useState } from "react";
import { Alert, BackHandler, TouchableOpacity, Vibration, View } from "react-native";
import { NavigationContainer, useIsFocused } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";

import {
  AUTHSTACK,
  AUTH_LOADING_SCREEN,
  LOGIN,
  BOTTOM_NAVIGATION_STACK,
  HOME_SCREEN_MAIN,
  BOTTOM_TAB_HOMESCREEN,
  BOTTOM_TAB_CONTEST_SCREEN,
  BOTTOM_TAB_WALLET_SCREEN,
  BOTTOM_TAB_SUPPORT_SCREEN,
  SUB_MENU_SCREEN,
  ADD_CASH_SCREEN,
  WEB_URL_SCREEN,
  CASHIER_SCREEN,
  WITHDRAW_SCREEN,
  TRANSACTIONS_SCREEN,
  EDIT_PROFILE_SCREEN,
  PRIVACY_POLICY_SCREEN,
  TERMS_OF_USE_SCREEN,
  LEGALITY_SCREEN,
  ABOUT_US_SCREEN,
  BOTTOM_TAB_OFFER_SCREEN,
  REWARDS_DESCRIPTION_SCREEN,
  REWARDS_OPTIN_SCREEN,
  LEADERBOARD_SCREEN,
  LEADERBOARD_SERIES_SCREEN,
  TDS_CERTIFICATE_SCREEN
} from "./routes";
import NavigationService from "./NavigationService";
import AuthLoading from "../screens/AuthLoading";
import Login from "../screens/Login";
import { colors, NewColor } from "../theme/color";
import LinearGradient from "react-native-linear-gradient";
import Home from "../screens/Home";
import CustomDrawer from "../common/CustomDrawer";
import FastImage from "react-native-fast-image";
import {
  bottomRewardIcon,
  bottomMenuIcon,
  cashierIcon,
  whatsupAppIcon,
  bottomOfferIcon,
} from "../helper/image";
import {
  AppText,
  BROWNYELLOW,
  GRY,
  INTER_MEDIUM,
  RED,
  TEN,
} from "../common/AppText";
import SubMenu from "../common/SubMenu";
import Reward from "../screens/Reward";
import AddCash from "../screens/AddCash";
import WebUrl from "../common/WebUrl";
import Cashier from "../screens/Cashier";
import Withdrawal from "../screens/Withdrawal";
import Transactions from "../screens/Transactions";
import EditProfile from "../screens/EditProfile";
import PrivatePolicy from "../screens/PrivacyPolicy";
import TermsOfUse from "../screens/TermsOfUse";
import Legality from "../screens/Legality";
import AboutUs from "../screens/AboutUs";
import LoginModal from "../common/LoginModal";
import RewardsDescription from "../screens/RewardsDescription";
import RewardOptIn from "../screens/RewardOptIn";
import LeaderBoard from "../screens/LeaderBoard";
import LeaderBoardSeries from "../screens/LeaderBoardSeries";
import TDSCertificate from "../screens/TDSCertificate";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const Navigator = () => {
  useEffect(() => {
    const backAction = () => {
      NavigationService.goBack();
      return true; // Block the default behavior
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    return () => backHandler.remove(); // Cleanup on unmount
  }, []);
  
 
  return (
    <NavigationContainer
      ref={(navigatorRef) => {
        NavigationService.setTopLevelNavigator(navigatorRef);
      }}
    >
      <RootStackScreen />
    </NavigationContainer>
  );
};

export default Navigator;

const RootStackScreen = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <Stack.Screen
      name={AUTH_LOADING_SCREEN}
      component={AuthLoading}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name={AUTHSTACK}
      component={AuthStack}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name={BOTTOM_NAVIGATION_STACK}
      component={BottomMainTab}
      options={{ headerShown: false }}
    />
    <Stack.Screen name={SUB_MENU_SCREEN} component={SubMenu} />
    <Stack.Screen name={ADD_CASH_SCREEN} component={AddCash} />
    <Stack.Screen name={WEB_URL_SCREEN} component={WebUrl} />
    <Stack.Screen name={WITHDRAW_SCREEN} component={Withdrawal}/>
    <Stack.Screen name={TRANSACTIONS_SCREEN} component={Transactions}/>
    <Stack.Screen name={EDIT_PROFILE_SCREEN} component={EditProfile}/>
    <Stack.Screen name={PRIVACY_POLICY_SCREEN} component={PrivatePolicy}/>
    <Stack.Screen name={TERMS_OF_USE_SCREEN} component={TermsOfUse}/>
    <Stack.Screen name={LEGALITY_SCREEN} component={Legality}/>
    <Stack.Screen name={ABOUT_US_SCREEN} component={AboutUs}/>
    <Stack.Screen name={REWARDS_DESCRIPTION_SCREEN} component={RewardsDescription}/>
    <Stack.Screen name={REWARDS_OPTIN_SCREEN} component={RewardOptIn}/>
    <Stack.Screen name={LEADERBOARD_SCREEN} component={LeaderBoard}/>
    <Stack.Screen name={LEADERBOARD_SERIES_SCREEN} component={LeaderBoardSeries}/>
    <Stack.Screen name={TDS_CERTIFICATE_SCREEN} component={TDSCertificate}/>
  </Stack.Navigator>
);

const AuthStack = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name={LOGIN} component={Login} />
    </Stack.Navigator>
  );
};

const HomeStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <Stack.Screen
      name={HOME_SCREEN_MAIN}
      component={Home}
      options={{ headerShown: false}}
    />
  </Stack.Navigator>
  
);

const CashierStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <Stack.Screen
      name={CASHIER_SCREEN}
      component={Cashier}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

const TabBarBackground = () => (
  <LinearGradient
    colors={["#032146", "#070C19"]} // Your gradient colors
    style={{
      flex: 1}}

    start={{ x: 0, y: 0 }}
    end={{ x: 0, y: 0.4 }}
  />
);

const BottomMainTab = () => {
  const BottomTab = createBottomTabNavigator();
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <><BottomTab.Navigator
      backBehavior="initialRoute"
      // initialRouteName={HOME_SCREEN_MAIN}
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarBackground: () => <TabBarBackground />,
        tabBarStyle: {
          backgroundColor: colors.menuText,
          height: 60,
          borderTopWidth: 0,
          paddingVertical: 10,
        },

        // tabBarAllowFontScaling: true,
        tabBarShowLabel: false,
      }}
    >
      <BottomTab.Screen
        name={BOTTOM_TAB_HOMESCREEN}
        component={HomeDrawer}
        listeners={({ navigation }) => ({
          tabPress: () => {
            // Trigger vibration on tab press
            Vibration.vibrate(50); // Short vibration of 50ms
          },
        })}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: "center", width: 50 }}>
              <FastImage
                source={bottomMenuIcon}
                tintColor={focused ? colors.goldenColor : colors.gray}
                style={{
                  width: 25,
                  height: 25,
                  marginTop: 30,
                }}
                resizeMode="contain" />
              <AppText
                style={{ marginTop: 4 }}
                color={focused ? BROWNYELLOW : GRY}
                weight={INTER_MEDIUM}
                type={TEN}
              >
                Home
              </AppText>
            </View>
          ),
        }} />
      <BottomTab.Screen
        name={BOTTOM_TAB_CONTEST_SCREEN}
        component={MyRewardDrawer}
        listeners={({ navigation }) => ({
          tabPress: () => {
            // Trigger vibration on tab press
            Vibration.vibrate(50); // Short vibration of 50ms
          },
        })}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: "center", width: 50 }}>
              <FastImage
                source={bottomRewardIcon}
                tintColor={focused ? colors.goldenColor : colors.gray}
                style={{
                  width: 25,
                  height: 25,
                  marginTop: 30,
                }}
                resizeMode="contain" />
              <AppText
                style={{ marginTop: 4 }}
                color={focused ? BROWNYELLOW : GRY}
                weight={INTER_MEDIUM}
                type={TEN}
              >
                Rewards
              </AppText>
            </View>
          ),
        }} />
      <BottomTab.Screen
        name={BOTTOM_TAB_OFFER_SCREEN}
        component={() => null}
        listeners={({ navigation }) => ({
          tabPress: () => {
            // Trigger vibration on tab press
            Vibration.vibrate(50); // Short vibration of 50ms
          },
        })}
        options={{
          tabBarIcon: ({ focused }) => (
            <TouchableOpacity style={{ alignItems: "center", width: 70 }} onPress={() => setModalVisible(true)}>
              <FastImage
                source={bottomOfferIcon}
                // tintColor={focused ? colors.goldenColor : colors.gray}
                style={{
                  width: 60,
                  height: 80,
                  // marginTop: 45,
                }}
                resizeMode="cover" />
            </TouchableOpacity>
          ),
          // tabBarButton: () => (
          //   <Button
          //     title="Open Modal"
          //     onPress={() => setModalVisible(true)}
          //   />
          // ),
        }} />
      <BottomTab.Screen
        name={BOTTOM_TAB_WALLET_SCREEN}
        component={MyContestDrawer}
        listeners={({ navigation }) => ({
          tabPress: () => {
            // Trigger vibration on tab press
            Vibration.vibrate(50); // Short vibration of 50ms
          },
        })}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: "center", width: 50 }}>
              <FastImage
                source={cashierIcon}
                tintColor={focused ? colors.goldenColor : colors.gray}
                style={{
                  width: 25,
                  height: 25,
                  marginTop: 30,
                }}
                resizeMode="contain" />
              <AppText
                style={{ marginTop: 4 }}
                color={focused ? BROWNYELLOW : GRY}
                weight={INTER_MEDIUM}
                type={TEN}
              >
                Cashier
              </AppText>
            </View>
          ),
        }} />
      <BottomTab.Screen
        name={BOTTOM_TAB_SUPPORT_SCREEN}
        component={MyContestDrawer}
        listeners={({ navigation }) => ({
          tabPress: () => {
            // Trigger vibration on tab press
            Vibration.vibrate(50); // Short vibration of 50ms
          },
        })}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: "center", width: 50 }}>
              <FastImage
                source={whatsupAppIcon}
                tintColor={colors.green}
                style={{
                  width: 25,
                  height: 25,
                  marginTop: 30,
                }}
                resizeMode="contain" />
              <AppText
                style={{ marginTop: 4 }}
                color={focused ? BROWNYELLOW : GRY}
                weight={INTER_MEDIUM}
                type={TEN}
              >
                Support
              </AppText>
            </View>
          ),
        }} />

    </BottomTab.Navigator><LoginModal isOpen={modalVisible} setIsOpen={setModalVisible} /></>
  );
};

const HomeDrawer = ({ navigation }) => {
  const isFocused = useIsFocused();
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={(props) => (
        <CustomDrawer
          {...props}
          navigation={navigation}
          isFocused={isFocused}
        />
      )}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Drawer.Screen
        name="Home"
        component={HomeStack}
        options={{
          // overlayColor: "transparent",
          drawerStyle: {
            width: "80%",
            // backgroundColor: "transparent",
            height: "100%",
            // marginTop: 95,
          },
          sceneContainerStyle: { backgroundColor: "transparent" },
          // headerShown: false,
        }}
      />
    </Drawer.Navigator>
  );
};

const MyContestDrawer = ({ navigation }) => {
  const isFocused = useIsFocused();
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={(props) => (
        <CustomDrawer
          {...props}
          navigation={navigation}
          isFocused={isFocused}
        />
      )}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Drawer.Screen
        name="Home"
        component={CashierStack}
      
        options={{
          // overlayColor: "transparent",
          drawerStyle: {
            width: "80%",
            // backgroundColor: "transparent",
            height: "100%",
            // marginTop: 95,
          },
          sceneContainerStyle: { backgroundColor: "transparent" },
          headerShown: false,
        }}
      />
    </Drawer.Navigator>
  );
};

const MyRewardDrawer = ({ navigation }) => {
  const isFocused = useIsFocused();
  return (
    <Drawer.Navigator
      initialRouteName="Reward"
      drawerContent={(props) => (
        <CustomDrawer
          {...props}
          navigation={navigation}
          isFocused={isFocused}
        />
      )}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Drawer.Screen
        name="Reward"
        component={Reward}
        options={{
          // overlayColor: "transparent",
          drawerStyle: {
            width: "80%",
            // backgroundColor: "transparent",
            height: "100%",
            // marginTop: 95,
          },
          sceneContainerStyle: { backgroundColor: "transparent" },
          headerShown: false,
        }}
      />
    </Drawer.Navigator>
  );
};
