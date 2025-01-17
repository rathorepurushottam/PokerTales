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
import { rejectedIcon, successfullIcon } from "../helper/image";
import { AppText,INTER_REGULAR, INTER_SEMI_BOLD, MENUTEXT, SIXTEEN, TWENTY_FOUR } from "./AppText";

const CustomModal = ({isOpen, setIsOpen, desc, title, isError}) => {
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
          <LinearGradient colors={['#FBE9BD', '#FBE9BD']} style={styles.modalContent} onStartShouldSetResponder={() => true}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={toggleModal}
            >
              <Icon name="close-circle" size={24} color="#D9D9D940" style={{postion: "absolute", bottom: 50, left: 38}}/>
            </TouchableOpacity>
            <View style={{alignItems: "center"}}>
                <FastImage source={isError ? rejectedIcon : successfullIcon} resizeMode="center" style={{width: 90, height: 90}}/>
                <AppText color={MENUTEXT} type={TWENTY_FOUR} weight={INTER_SEMI_BOLD} style={{marginTop: 20}}>{title}</AppText>
                <AppText color={MENUTEXT} type={SIXTEEN} weight={INTER_REGULAR} style={{marginTop: 20}}>{desc}</AppText>
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
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "75%",
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
    height: "40%"
  },
  closeButton: {
    alignSelf: "flex-end",
  },
  modalText: {
    marginTop: 20,
    fontSize: 18,
    textAlign: "center",
  },
});

export default CustomModal;
