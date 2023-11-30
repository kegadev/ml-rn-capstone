import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import OnBoarding from "./screens/OnBoarding";
import { APP_COLORS } from "./constants/colors";

export default function App() {
  return (
    <View style={styles.container}>
      <OnBoarding />
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
});
