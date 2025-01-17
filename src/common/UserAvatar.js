import { Image, Pressable, StyleSheet, TouchableOpacity, View } from "react-native";
import {
  AppText,
  BLACK,
  FORTEEN,
  INTER_MEDIUM,
  INTER_SEMI_BOLD,
  SIXTEEN,
  TWELVE,
} from "./AppText";
import { colors } from "../theme/color";
import FastImage from "react-native-fast-image";
import {
  backIcon,
  aadharIcon,
  panIcon,
  userAvatar1,
  userAvatar2,
  userAvatar3,
  userAvatar4,
  userAvatar5,
  userAvatar6,
  tick,
} from "../helper/image";
import LinearGradient from "react-native-linear-gradient";
import PrimaryButton from "./PrimaryButton";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL, IMAGE_BASE_URL } from "../helper/utility";
import { upateProfile } from "../actions/profileAction";

const UserAvatar = ({ onSelectesAvatar, selectedAvatar, onCloseAvatar }) => {
  const dispatch = useDispatch();
  const avatarList = useSelector(state => {
    return state.profile.avatarList;
  });

  const handleSelectImage = async () => {
    onSelectesAvatar(selectedAvatar);
    handleUpdateProfile();
  };

  const handleUpdateProfile = () => {
    let data =  {
      avatar: selectedAvatar,
    }
    dispatch(upateProfile(data));
    onCloseAvatar();
  }

  console.log(avatarList, "avatarList");
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.sheetHeader}>
        {/* <FastImage
          source={backIcon}
          resizeMode="contain"
          style={{ width: 15, height: 15, marginLeft: 10 }}
        /> */}
        <AppText
          type={SIXTEEN}
          weight={INTER_MEDIUM}
          //   style={{ marginRight: 110 }}
        >
          Avatar
        </AppText>
      </View>
      <View style={{ flex: 2, justifyContent: "space-evenly" }}>
        <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
          <TouchableOpacity
            style={[
              styles.avatarUnSelect,
              {
                borderColor:
                  selectedAvatar ===  avatarList[0]?.avtarImage ? "#032146" : "#F3DD96",
              },
            ]}
            onPress={() => onSelectesAvatar( avatarList[0]?.avtarImage)}
          >
            <FastImage
              source={{uri: IMAGE_BASE_URL + avatarList[0]?.avtarImage}}
              style={{ width: 80, height: 80 }}
              resizeMode="contain"
            />
            {selectedAvatar ===  avatarList[0]?.avtarImage &&  <View style={styles.avatarSelected}>
              <FastImage
                source={tick}
                style={{ width: 15, height: 15 }}
                resizeMode="contain"
                tintColor={colors.white}
              />
            </View>}
            
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.avatarUnSelect,
              {
                borderColor:
                  selectedAvatar === avatarList[1]?.avtarImage ? "#032146" : "#F3DD96",
              },
            ]}
            onPress={() => onSelectesAvatar(avatarList[1]?.avtarImage)}
          >
            <FastImage
              source={{uri: IMAGE_BASE_URL + avatarList[1]?.avtarImage}}
              style={{ width: 80, height: 80 }}
              resizeMode="contain"
            />
            {selectedAvatar === avatarList[1]?.avtarImage &&  <View style={styles.avatarSelected}>
              <FastImage
                source={tick}
                style={{ width: 15, height: 15 }}
                resizeMode="contain"
                tintColor={colors.white}
              />
            </View>}
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.avatarUnSelect,
              {
                borderColor:
                  selectedAvatar === avatarList[2]?.avtarImage ? "#032146" : "#F3DD96",
              },
            ]}
            onPress={() => onSelectesAvatar(avatarList[2]?.avtarImage)}
          >
            <FastImage
              source={{uri: IMAGE_BASE_URL + avatarList[2]?.avtarImage}}
              style={{ width: 80, height: 80 }}
              resizeMode="contain"
            />
            {selectedAvatar === avatarList[2]?.avtarImage &&  <View style={styles.avatarSelected}>
              <FastImage
                source={tick}
                style={{ width: 15, height: 15 }}
                resizeMode="contain"
                tintColor={colors.white}
              />
            </View>}
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
          <TouchableOpacity
            style={[
              styles.avatarUnSelect,
              {
                borderColor:
                  selectedAvatar === avatarList[3]?.avtarImage ? "#032146" : "#F3DD96",
              },
            ]}
            onPress={() => onSelectesAvatar(avatarList[3]?.avtarImage)}
          >
            <FastImage
              source={{uri: IMAGE_BASE_URL + avatarList[3]?.avtarImage}}
              style={{ width: 80, height: 80 }}
              resizeMode="contain"
            />
            {selectedAvatar === avatarList[3]?.avtarImage &&  <View style={styles.avatarSelected}>
              <FastImage
                source={tick}
                style={{ width: 15, height: 15 }}
                resizeMode="contain"
                tintColor={colors.white}
              />
            </View>}
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.avatarUnSelect,
              {
                borderColor:
                  selectedAvatar === avatarList[4]?.avtarImage ? "#032146" : "#F3DD96",
              },
            ]}
            onPress={() => onSelectesAvatar(avatarList[4]?.avtarImage)}
          >
            <FastImage
               source={{uri: IMAGE_BASE_URL + avatarList[4]?.avtarImage}}
              style={{ width: 80, height: 80 }}
              resizeMode="contain"
            />
            {selectedAvatar === avatarList[4]?.avtarImage &&  <View style={styles.avatarSelected}>
              <FastImage
                source={tick}
                style={{ width: 15, height: 15 }}
                resizeMode="contain"
                tintColor={colors.white}
              />
            </View>}
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.avatarUnSelect,
              {
                borderColor:
                  selectedAvatar === avatarList[5]?.avtarImage ? "#032146" : "#F3DD96",
              },
            ]}
            onPress={() => onSelectesAvatar(avatarList[5]?.avtarImage)}
          >
            <FastImage
             source={{uri: IMAGE_BASE_URL + avatarList[5]?.avtarImage}}
              style={{ width: 80, height: 80 }}
              resizeMode="contain"
            />
            {selectedAvatar === avatarList[5]?.avtarImage &&  <View style={styles.avatarSelected}>
              <FastImage
                source={tick}
                style={{ width: 15, height: 15 }}
                resizeMode="contain"
                tintColor={colors.white}
              />
            </View>}
          </TouchableOpacity>
        </View>
        <PrimaryButton
          title={"Save"}
          buttonStyle={{ width: 180, alignSelf: "center" }}
          onPress={handleSelectImage}
        />
      </View>
    </View>
  );
};

export default UserAvatar;

const styles = StyleSheet.create({
  sheetHeader: {
    backgroundColor: colors.menuText,
    height: 70,
    flexDirection: "row",
    justifyContent: "center",
    paddingHorizontal: 20,
    alignItems: "center",
  },
  avatarUnSelect: {
    borderWidth: 2,
    // borderColor: "#F3DD96",
    borderRadius: 50,
    height: 100,
    width: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarSelected: {
    backgroundColor: "#032146",
    width: 25,
    height: 25,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    position: "absolute",
    top: 85
  },
});
