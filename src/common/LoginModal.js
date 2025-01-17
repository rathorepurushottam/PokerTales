import React from "react";
import {
  Modal,
  View,
  TouchableOpacity,
  StyleSheet,
  Pressable,
} from "react-native";
import FastImage from "react-native-fast-image";
import LinearGradient from "react-native-linear-gradient";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { bannerHereIcon, successfullIcon } from "../helper/image";
import { AppText,DISABLETEXT,INTER_REGULAR, INTER_SEMI_BOLD, MENUTEXT, SIXTEEN, TWENTY_FIVE, TWENTY_FOUR } from "./AppText";

const LoginModal = ({isOpen, setIsOpen}) => {
  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <View >
      <Modal
        animationType="slide"
        transparent={true}
        visible={isOpen}
        onRequestClose={toggleModal}
        style={styles.container}
      >
        <Pressable style={styles.modalOverlay} onPress={toggleModal}>
          <LinearGradient colors={['#032045', '#08305E']} style={styles.modalContent} onStartShouldSetResponder={() => true}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={toggleModal}
            >
              <Icon name="close-circle" size={24} color="white" />
            </TouchableOpacity>
            <View style={{justifyContent: "center", marginTop: 200, alignItems: "center"}}>
            <FastImage source={bannerHereIcon} resizeMode="stretch" style={{width: 180, height: 100}} />
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
    width: "90%",
    backgroundColor: "white",
    // borderRadius: 10,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    height: "50%"
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

export default LoginModal;
