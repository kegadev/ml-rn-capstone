import { StyleSheet } from "react-native";
import { APP_COLORS } from "../constants/colors";

export const APP_STYLES = StyleSheet.create({
  divider: {
    height: 2,
    width: "100%",
    borderRadius: 1,
    alignSelf: "center",
    paddingHorizontal: 10,
    marginVertical: 20,
    backgroundColor: APP_COLORS.highlight_light,
  },
  textInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
    borderRadius: 8,
    marginBottom: 10,
    flexDirection: "row",
    paddingHorizontal: 10,
    color: APP_COLORS.highlight_dark,
    backgroundColor: APP_COLORS.highlight_light,
  },
});
