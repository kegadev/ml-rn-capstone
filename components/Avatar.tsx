import { Image, View, StyleSheet, TouchableOpacity } from "react-native";
import { APP_COLORS } from "../constants/colors";

export enum AvatarSize {
  SMALL = 36,
  MEDIUM = 64,
  LARGE = 128,
}
type AvatarProps = {
  onPress?: () => void;
  avatarSize?: AvatarSize;
};

const imageSizeStyle = (avatarSize: AvatarSize) => {
  return {
    width: avatarSize,
    height: avatarSize,
  };
};

export const Avatar = ({
  onPress,
  avatarSize = AvatarSize.SMALL,
}: AvatarProps) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.container, imageSizeStyle(avatarSize)]}>
        <Image
          style={imageSizeStyle(avatarSize)}
          resizeMode="cover"
          source={require("../assets/images/customer-smile.jpg")}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    overflow: "hidden",
  },
});
