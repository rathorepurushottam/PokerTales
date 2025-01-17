import { ScrollView, StatusBar, Text, View } from "react-native";
import { AppSafeAreaView } from "./AppSafeAreaView";
import Header from "./Header";
import { colors } from "../theme/color";
import { AppText, BLACK, FORTEEN, INTER_REGULAR, INTER_SEMI_BOLD, TEN } from "./AppText";

const SubMenu = ({ route }) => {
  let title = route?.params?.data;
  return (
    <AppSafeAreaView>
      <StatusBar
        // backgroundColor={'transparent'}
        translucent={true}
        networkActivityIndicatorVisible={true}
      />
      <Header title={title} commonHeader style={{marginTop: 30}}/>
      <View style={{ flex: 1, backgroundColor: colors.white }}>
        <ScrollView>
          <AppText type={TEN} color={BLACK} weight={INTER_REGULAR} style={{paddingHorizontal: 20, paddingVertical: 10}}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </AppText>
          <AppText type={FORTEEN} color={BLACK} weight={INTER_SEMI_BOLD} style={{paddingHorizontal: 20, paddingVertical: 10}}>Why do we use it?</AppText>
          <AppText type={TEN} color={BLACK} weight={INTER_REGULAR} style={{paddingHorizontal: 20, paddingVertical: 10}}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </AppText>
          <AppText type={FORTEEN} color={BLACK} weight={INTER_SEMI_BOLD} style={{paddingHorizontal: 20, paddingVertical: 10}}>Why do we use it?</AppText>
          <AppText type={TEN} color={BLACK} weight={INTER_REGULAR} style={{paddingHorizontal: 20, paddingVertical: 10}}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </AppText>
          <AppText type={FORTEEN} color={BLACK} weight={INTER_SEMI_BOLD} style={{paddingHorizontal: 20, paddingVertical: 10}}>Why do we use it?</AppText>
          <AppText type={TEN} color={BLACK} weight={INTER_REGULAR} style={{paddingHorizontal: 20, paddingVertical: 10}}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </AppText>
        </ScrollView>
      </View>
    </AppSafeAreaView>
  );
};

export default SubMenu;
