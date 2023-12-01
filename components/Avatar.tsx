import { Image, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { APP_COLORS } from "../constants/colors";

export enum AvatarSize {
  SMALL = 36,
  MEDIUM = 64,
  LARGE = 128,
}
type AvatarProps = {
  onPress?: () => void;
  avatarSize?: AvatarSize;
  imageUrl?: string;
  text?: string;
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
  imageUrl = "",
  text = "",
}: AvatarProps) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.container, imageSizeStyle(avatarSize)]}>
        {!text && (
          <Image
            style={imageSizeStyle(avatarSize)}
            resizeMode="cover"
            source={
              imageUrl
                ? { uri: imageUrl }
                : require("../assets/images/smile-profile.jpg")
            }
          />
        )}
        {!imageUrl && text && (
          <View
            style={[
              imageSizeStyle(avatarSize),
              {
                alignItems: "center",
                justifyContent: "center",
              },
            ]}
          >
            <Text
              style={{
                fontSize: avatarSize / 2,
                color: APP_COLORS.highlight_dark,
              }}
            >
              {text}
            </Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: APP_COLORS.secondary_soft_pink,
    borderRadius: 16,
    overflow: "hidden",
  },
});
