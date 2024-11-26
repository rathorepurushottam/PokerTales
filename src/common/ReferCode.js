import { useState } from "react";
import { StyleSheet, View } from "react-native";
import PrimaryButton from "./PrimaryButton";
import { AppText, BLUE, INTER_MEDIUM, INTER_SEMI_BOLD, TWENTY } from "./AppText";
import InputBox from "./InputBox";
import { useDispatch, useSelector } from "react-redux";
import { valideReferCode } from "../actions/authActions";
import { SpinnerSecond } from "./SnipperSecond";
import { universalPaddingHorizontal } from "../theme/dimens";

const ReferCode = ({onCloseRefer, referCode, setReferCode}) => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => {
    return state.auth.isLoading;
  });
  const [signFocus, setSignFocus] = useState(false);


  const handleReferCode = () => {
    let data = {
      refCode:  referCode
    };
    dispatch(valideReferCode(data, onCloseRefer, setReferCode))
  }

    return (
        <View styles={styles.mainView}>
          <View
            style={{
              borderColor: "#5E6272",
              backgroundColor: "#5E6272",
              borderWidth: 2,
              width: "20%",
              alignSelf: "center",
              borderRadius: 10,
              marginVertical: 10,
            }}
          ></View>
          <AppText
            type={TWENTY}
            color={BLUE}
            style={{ marginVertical: 15, paddingHorizontal: universalPaddingHorizontal, }}
            weight={INTER_SEMI_BOLD}
          >
            Referral Code
          </AppText>
          <InputBox
            placeholder={"Enter Code"}
            top
            placeholderTextColor={"#00000066"}
            textInputStyle={{
              borderWidth: 1,
              borderColor: signFocus ? "#1251AE" : "#E4E4E4",
              borderRadius: 12,
              backgroundColor: "#F5F5F5",
              height: 55,
            }}
            style={{paddingHorizontal: universalPaddingHorizontal}}
            value={referCode}
            onChange={(value) => setReferCode(value)}
            onFocus={() => setSignFocus(true)}
            onBlur={() => setSignFocus(false)}
          />
          
          <PrimaryButton
            title={"Apply"}
            weight={INTER_MEDIUM}
            disabled={!referCode}
            buttonStyle={{ marginTop: 40, paddingHorizontal: universalPaddingHorizontal }}
            onPress={handleReferCode}
          />
          <SpinnerSecond loading={loading} />
        </View>
      );
};

export default ReferCode;

const styles = StyleSheet.create({
    mainView: {
      flex: 1,
    },
  });