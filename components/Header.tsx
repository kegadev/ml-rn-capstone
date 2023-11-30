import { View, Image, StyleSheet } from "react-native";
import { APP_COLORS } from "../constants/colors";

export default function Header() {
  return (
    <View style={styles.headerContainer}>
      <Image source={require("../assets/images/logo.png")} />
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
    justifyContent: "center",
    backgroundColor: APP_COLORS.highlight_light,
  },
});
