import { View, Image, StyleSheet, TouchableOpacity } from "react-native";
import { APP_COLORS } from "../constants/colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { NavigationProp } from "@react-navigation/native";
import { Avatar, AvatarSize } from "./Avatar";

const BackIcon = ({ navigation }: any) => {
  return (
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <Ionicons
        style={{ marginLeft: 16 }}
        name="md-arrow-back-circle"
        size={32}
        color={APP_COLORS.highlight_dark}
      />
    </TouchableOpacity>
  );
};

const ImageLogo = () => {
  return (
    <View style={styles.imageContainer}>
      <Image resizeMode="cover" source={require("../assets/images/logo.png")} />
    </View>
  );
};

type HeaderProps = {
  showBackButton?: boolean;
  navigation: NavigationProp<any>;
  avatar?: any;
};

export default function Header({
  showBackButton = false,
  navigation,
  avatar,
}: HeaderProps) {
  return (
    <View style={styles.headerContainer}>
      {/* Back Button (LEFT) */}
      <View style={styles.backButtonContainer}>
        {showBackButton && <BackIcon navigation={navigation} />}
      </View>
      {/* Image Logo (CENTER) */}
      <ImageLogo />

      {/* Profile Image (RIGHT) */}
      <View style={styles.profileImageContainer}>
        {avatar}
        {/* <Avatar onPress={() => navigation.navigate("Profile")} /> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    paddingTop: 60,
    minWidth: "100%",
    paddingBottom: 10,
    paddingVertical: 16,
    flexDirection: "row",
    backgroundColor: APP_COLORS.highlight_light,
  },
  backButtonContainer: {
    flex: 1,
    flexDirection: "row",
  },
  imageContainer: {
    flex: 1,
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "center",
  },
  profileImageContainer: {
    flex: 1,
    flexDirection: "row",
    right: 16,
    justifyContent: "flex-end",
  },
});
