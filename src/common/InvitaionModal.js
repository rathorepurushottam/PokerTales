import React from "react";
import { Modal, View, TouchableOpacity, StyleSheet, Pressable } from "react-native";
import FastImage from "react-native-fast-image";
import LinearGradient from "react-native-linear-gradient";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { bannerHereIcon, successfullIcon } from "../helper/image";
import {
  AppText,
  BROWNYELLOW,
  DISABLETEXT,
  INTER_BOLD,
  INTER_REGULAR,
  INTER_SEMI_BOLD,
  MENUTEXT,
  SIXTEEN,
  TWELVE,
  TWENTY_FIVE,
  TWENTY_FOUR,
  WHITE,
} from "./AppText";
import { colors } from "../theme/color";

const InvitaionModal = ({ isOpen, setIsOpen }) => {
  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isOpen}
        onRequestClose={toggleModal}
        style={styles.container}
      >
        <Pressable style={styles.modalOverlay} onPress={toggleModal}>
          <LinearGradient
            colors={["#032045", "#08305E"]}
            style={styles.modalContent}
            onStartShouldSetResponder={() => true}
          >
            <TouchableOpacity style={styles.closeButton} onPress={toggleModal}>
              <Icon
                name="close-circle"
                size={24}
                color="#D9D9D940"
                style={{ postion: "absolute", bottom: 50, left: 38 }}
              />
            </TouchableOpacity>
            <View
              style={{
                height: "85%",
                justifyContent: "space-between",
                alignItems: "flex-start",
                padding: 10
              }}
            >
              <AppText
                weight={INTER_BOLD}
                type={TWENTY_FOUR}
                color={BROWNYELLOW}
                style={{ alignSelf: "center" }}
              >
                Refer a friend
              </AppText>
              <AppText weight={INTER_SEMI_BOLD} type={TWELVE} color={WHITE}>
                1. You will get ₹25 on your friend's Signup
              </AppText>
              <AppText weight={INTER_SEMI_BOLD} type={TWELVE} color={WHITE}>
                2. You will get ₹25 on your friend's KYC completion
              </AppText>
              <AppText weight={INTER_SEMI_BOLD} type={TWELVE} color={WHITE}>
                3. You will get ₹50 on your friend's First Deposit
              </AppText>
            </View>
          </LinearGradient>
        </Pressable>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  openButton: {
    backgroundColor: "#2196F3",
    padding: 10,
    borderRadius: 5,
  },
  openButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "white",
    // borderRadius: 10,
    padding: 20,
    // alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    height: "30%",
    borderWidth: 1,
    borderColor: colors.brownYellow,
    borderRadius: 10,
  },
  closeButton: {
    alignSelf: "flex-end",
    // backgroundColor: "#D9D9D940"
  },
  modalText: {
    marginTop: 20,
    fontSize: 18,
    textAlign: "center",
  },
});

export default InvitaionModal;
