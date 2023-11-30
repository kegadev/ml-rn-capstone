import { View, Text, StyleSheet } from "react-native";
import { APP_COLORS } from "../constants/colors";

export default function Footer() {
  return (
    <View style={styles.footerContainer}>
      <Text style={styles.footerText}>
        Little Lemon by <Text style={styles.footerTextBold}>@kegadev</Text> 2023
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  footerContainer: {
    paddingTop: 10,
    minWidth: "100%",
    paddingBottom: 25,
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: APP_COLORS.primary_yellow,
  },
  footerText: {
    color: APP_COLORS.highlight_dark,
    fontSize: 14,
  },
  footerTextBold: {
    fontWeight: "bold",
  },
});
