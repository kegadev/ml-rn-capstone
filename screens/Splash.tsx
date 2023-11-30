import { View, Text, StyleSheet, Image } from "react-native";
import { APP_COLORS } from "../constants/colors";

export default function Splash() {
  return (
    <View style={styles.container}>
      <Image resizeMode="cover" source={require("../assets/images/logo.png")} />
      {/* <Text>Splash Screen..</Text> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: APP_COLORS.highlight_light,
  },
  image: {
    width: 128,
    height: 128,
  },
});
