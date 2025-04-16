import { StyleSheet, TouchableOpacity, View } from "react-native";
import { AppSafeAreaView } from "../common/AppSafeAreaView";
import Header from "../common/Header";
import { colors } from "../theme/color";
import { useEffect, useRef, useState } from "react";
import {
  AppText,
  BLACK,
  BLACKOPACITY,
  DISABLETEXT,
  ELEVEN,
  FIFTEEN,
  FORTEEN,
  INTER_BOLD,
  INTER_MEDIUM,
  INTER_SEMI_BOLD,
  MENUTEXT,
  SIXTEEN,
  TEN,
  TWELVE,
} from "../common/AppText";
import { useDispatch, useSelector } from "react-redux";
import { getTdsTransactions, getTransactions } from "../actions/profileAction";
import FastImage from "react-native-fast-image";
import { calendraIcon, failedVector, inprocessVector, successVector } from "../helper/image";
import moment from "moment";
import { Primary } from "../theme/dimens";
import PrimaryButton from "../common/PrimaryButton";
import RBSheet from "react-native-raw-bottom-sheet";
import FinancialYear from "../common/FinancialYear";

const TDSCertificate = () => {
  const dispatch = useDispatch();
  const refRBSheetYear = useRef();
  const [financialYear, setFinancialYear] = useState("Select Financial Year");
  const [financialQuarter, setFinancialQuarter] = useState('');

  const handleCloseYear = () => {
    refRBSheetYear.current.close();
  };

  return (
    <AppSafeAreaView statusColor={"#032146"}>
      <Header title={"TDS Certificate"} />
      <View style={{ flex: 1, backgroundColor: colors.white, justifyContent: "space-between" }}>
        <View style={{marginHorizontal: 20}}>
            <TouchableOpacity style={[styles.InputBoxContainer]} onPress={() => refRBSheetYear.current.open()}>
              <AppText
                type={FORTEEN}
                weight={INTER_MEDIUM}
                color={BLACK}
                style={[styles.label, { marginTop: 20 }]}
              >
                Select Financial Year
              </AppText>
              <View
                style={[
                  styles.InputBox,
                ]}
              >
                <View style={{width: "50%", flexDirection: "row",justifyContent: "space-between",alignItems: "center",}}>
                <FastImage
                    style={styles.calandar}
                    source={calendraIcon}
                    tintColor={colors.black}
                  />
                <AppText
                  style={{
                    // marginLeft: 15,
                    // alignSelf: "center"
                  }}
                  color={financialYear === "Select Financial Year" ? DISABLETEXT : MENUTEXT}
                  weight={INTER_MEDIUM}
                  type={FORTEEN}
                >
                  {financialYear}
                </AppText>
                </View>
                
              </View>
            </TouchableOpacity>
            <AppText  type={FORTEEN}
                weight={INTER_MEDIUM}
                color={BLACK}
                style={[{ alignSlef: "left", marginTop: 10 }]}>Select Financial Quarter</AppText>
            <View style={{justifyContent: "space-between", height: "25%", marginTop: 20, width: "100%", alignItems: "center"}}>
              
              <View style={{flexDirection: "row", justifyContent: "space-around", width: "100%"}}>
              <TouchableOpacity style={[styles.subTab, {backgroundColor: financialQuarter === 'Apr-Jun' ? colors.menuText : "#F4F4F4"}]} onPress={() => setFinancialQuarter('Apr-Jun')}>
                <AppText type={FORTEEN} weight={INTER_MEDIUM} style={{color: financialQuarter === 'Apr-Jun' ? colors.white :"#3B3B3B"}}>Apr-Jun</AppText>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.subTab, {backgroundColor: financialQuarter === 'Jul-Sep' ? colors.menuText : "#F4F4F4"}]} onPress={() => setFinancialQuarter('Jul-Sep')}>
                <AppText type={FORTEEN} weight={INTER_MEDIUM}  style={{color: financialQuarter === 'Jul-Sep' ? colors.white :"#3B3B3B"}}>Jul-Sep</AppText>
              </TouchableOpacity>
              </View>
              <View style={{flexDirection: "row", justifyContent: "space-around", width: "100%"}}>
              <TouchableOpacity style={[styles.subTab, {backgroundColor: financialQuarter === 'Oct-Dec' ? colors.menuText : "#F4F4F4"}]} onPress={() => setFinancialQuarter('Oct-Dec')}>
                <AppText type={FORTEEN} weight={INTER_MEDIUM}  style={{color: financialQuarter === 'Oct-Dec' ? colors.white :"#3B3B3B"}}>Oct-Dec</AppText>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.subTab, {backgroundColor: financialQuarter === 'Jan-Mar' ? colors.menuText : "#F4F4F4"}]} onPress={() => setFinancialQuarter('Jan-Mar')}>
                <AppText type={FORTEEN} weight={INTER_MEDIUM}  style={{color: financialQuarter === 'Jan-Mar' ? colors.white :"#3B3B3B"}}>Jan-Mar</AppText>
              </TouchableOpacity>
              </View>
              
            </View>
        </View>
        <PrimaryButton title={'Download TDS Certificate'} buttonStyle={{marginHorizontal: 20, marginBottom: 30}} />
      </View>
      <RBSheet
        ref={refRBSheetYear}
        closeOnDragDown={true}
        height={320}
        customStyles={{
          container: {
            backgroundColor: colors.white,
            borderTopLeftRadius: 40,
            borderTopRightRadius: 40,
            // paddingHorizontal: universalPaddingHorizontal,
          },
          draggableIcon: {
            backgroundColor: "transparent",
            display: "none",
          },
        }}
      >
        {/* <Settings onClose={handleCloseSettings}/> */}
        <FinancialYear onClose={handleCloseYear} financialYear={financialYear} setFinancialYear={setFinancialYear}/>
      </RBSheet>
    </AppSafeAreaView>
  );
};

export default TDSCertificate;

const styles = StyleSheet.create({
  InputBoxContainer: {
    marginBottom: 10,
  },
  calandar: {
    width: 22,
    height: 22,
    resizeMode: "contain",
  },
  label: {
    marginBottom: 10,
  },
  InputBox: {
    backgroundColor: colors.white,
    borderRadius: 6,
    width: "100%",
    color: "white",
    paddingLeft: 10,
    height: Primary.Height,
    borderRadius: 10,
    borderColor: "#F4DAA8",
    borderWidth: 1,
    justifyContent: "center"
    // paddingHorizontal: 15,
  },
  subTab: {
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderRadius: 20,
    width: "40%",
    alignItems: "center"
  },
});
