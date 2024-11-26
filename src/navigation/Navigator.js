import React, { createContext, useEffect } from "react";
import { View } from "react-native";
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
} from "./routes";
import NavigationService from "./NavigationService";
import AuthLoading from "../screens/AuthLoading";
import Login from "../screens/Login";
import { colors, NewColor } from "../theme/color";
import LinearGradient from "react-native-linear-gradient";
import Home from "../screens/Home";
import CustomDrawer from "../common/CustomDrawer";
import FastImage from "react-native-fast-image";
import { bottomRewardIcon, bottomMenuIcon, cashierIcon, whatsupAppIcon } from "../helper/image";
import { AppText, BROWNYELLOW, GRY, INTER_MEDIUM, RED, TEN } from "../common/AppText";
import SubMenu from "../common/SubMenu";


const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const Navigator = () => {
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
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

const TabBarBackground = () => (
  <LinearGradient
    colors={['#032146', '#070C19']} // Your gradient colors
    style={{ flex: 1 }}
    start={{ x: 0, y: 0 }}
    end={{ x: 0, y: 1 }}
  />
);

const BottomMainTab = () => {
  const BottomTab = createBottomTabNavigator();
  return (
    <BottomTab.Navigator
      backBehavior="initialRoute"
      // initialRouteName={HOME_SCREEN_MAIN}
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarBackground: () => <TabBarBackground />,
        tabBarStyle: {
          backgroundColor: colors.menuText,
          height: 75,
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
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{alignItems: "center", width: 50}}>
              <FastImage
                source={bottomMenuIcon}
                tintColor={focused ? colors.goldenColor : colors.gray}
                style={{
                  width: 25,
                  height: 25,
                  marginTop: 45
                }}
                resizeMode="contain"
              />
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
        }}
      />
      <BottomTab.Screen
        name={BOTTOM_TAB_CONTEST_SCREEN}
        component={MyContestDrawer}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{alignItems: "center", width: 50}}>
              <FastImage
                source={bottomRewardIcon}
                tintColor={focused ? colors.goldenColor : colors.gray}
                style={{
                  width: 25,
                  height: 25,
                  marginTop: 45
                }}
                resizeMode="contain"
              />
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
        }}
      />
       <BottomTab.Screen
        name={BOTTOM_TAB_WALLET_SCREEN}
        component={MyContestDrawer}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{alignItems: "center", width: 50}}>
              <FastImage
                source={cashierIcon}
                tintColor={focused ? colors.goldenColor : colors.gray}
                style={{
                  width: 25,
                  height: 25,
                  marginTop: 45
                }}
                resizeMode="contain"
              />
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
        }}
      />
       <BottomTab.Screen
        name={BOTTOM_TAB_SUPPORT_SCREEN}
        component={MyContestDrawer}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{alignItems: "center", width: 50}}>
              <FastImage
                source={whatsupAppIcon}
                tintColor={colors.green}
                style={{
                  width: 25,
                  height: 25,
                  marginTop: 45
                }}
                resizeMode="contain"
              />
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
        }}
      />
    </BottomTab.Navigator>
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
          overlayColor: "transparent",
          drawerStyle: { width: "100%", backgroundColor: "transparent", height: "90%", marginTop: 95 },
          sceneContainerStyle: { backgroundColor: "transparent" },
          headerShown: false,
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
      drawerContent={props => (
        <CustomDrawer
          {...props}
          navigation={navigation}
          isFocused={isFocused}
        />
      )}
      screenOptions={{
        headerShown: false,
      }}
      drawerPosition={'left'}>
      <Drawer.Screen
        name="Home"
        component={MyContestDrawer}
        options={{
          overlayColor: "transparent",
          drawerStyle: { width: "100%", backgroundColor: "transparent", height: "90%", marginTop: 95 },
          sceneContainerStyle: { backgroundColor: "transparent" },
          headerShown: false,
        }}
        drawerStyle={{ borderWidth: 1 }}
      />
    </Drawer.Navigator>
  );
};
