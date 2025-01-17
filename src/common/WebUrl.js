import {
  Alert,
  BackHandler,
  ScrollView,
  StatusBar,
  Text,
  View,
} from "react-native";
import { AppSafeAreaView } from "./AppSafeAreaView";
import Header from "./Header";
import { colors } from "../theme/color";
import {
  AppText,
  BLACK,
  FORTEEN,
  INTER_REGULAR,
  INTER_SEMI_BOLD,
  TEN,
} from "./AppText";
import { WebView } from "react-native-webview";
import { useEffect } from "react";
import NavigationService from "../navigation/NavigationService";
import { useDispatch } from "react-redux";
import { getUserWallet } from "../actions/profileAction";

const WebUrl = ({ route }) => {
  let title = route?.params?.title;
  let link = route?.params?.link;
  const dispatch = useDispatch();

  useEffect(() => {
    const backAction = () => {
      Alert.alert("Hold on!", "Do you want to exit the Game?", [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel",
        },
        {
          text: "YES",
          onPress: () => handleNavigationToApp(),
        },
      ]);
      return true; // Block the default behavior
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove(); // Cleanup on unmount
  }, []);

  const handleNavigationToApp = () => {
    dispatch(getUserWallet());
    NavigationService.goBack();
  };

  return (
    <AppSafeAreaView>
      <StatusBar
        backgroundColor={"transparent"}
        translucent={true}
        networkActivityIndicatorVisible={true}
      />
      {/* <Header title={title} commonHeader /> */}
      <WebView
        source={{ uri: link }}
        style={{ flex: 1 }}
        basicAuthCredential={{ username: "pkr", password: "pokertales" }}
        containerStyle={{ paddingTop: 40 }}
      />
    </AppSafeAreaView>
  );
};

export default WebUrl;
