import Checkbox from "expo-checkbox";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import Header from "../components/Header";
import { Avatar, AvatarSize } from "../components/Avatar";
import { APP_COLORS } from "../constants/colors";
import { Spacer } from "../components/GeneralComponents";

export default function Profile({ navigation }: any) {
  return (
    <View style={styles.container}>
      <Header showBackButton navigation={navigation} />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.mainContainer}
      >
        <ScrollView keyboardDismissMode={"on-drag"}>
          <Spacer factor={0.5} />
          <Text style={styles.textCategory}>Personal Information</Text>
          <Spacer factor={0.2} />
          <Text style={styles.textLabel}>Avatar</Text>

          <View style={styles.avatarContainer}>
            <Avatar avatarSize={AvatarSize.LARGE} />
            <TouchableOpacity
              style={[
                styles.button,
                { backgroundColor: APP_COLORS.highlight_light },
              ]}
            >
              <Text style={styles.buttonText}>Change</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.buttonOutlined]}>
              <Text style={styles.buttonText}>Remove</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.textLabel}>First name</Text>
          <TextInput style={styles.textInput} />
          <Text style={styles.textLabel}>Last name</Text>
          <TextInput style={styles.textInput} />
          <Text style={styles.textLabel}>Email</Text>
          <TextInput style={styles.textInput} />
          <Text style={styles.textLabel}>Phone number</Text>
          <TextInput style={styles.textInput} />
          <Spacer factor={0.4} />
          <Text style={styles.textCategory}>Email notifications</Text>
          <Spacer factor={0.2} />
          <View style={styles.checkBoxContainer}>
            <Checkbox
              value={true}
              color={APP_COLORS.primary_green}
              style={styles.checkBox}
            />
            <Text>Order statuses</Text>
          </View>
          <View style={styles.checkBoxContainer}>
            <Checkbox
              value={true}
              color={APP_COLORS.primary_green}
              style={styles.checkBox}
            />
            <Text>Password changes</Text>
          </View>
          <View style={styles.checkBoxContainer}>
            <Checkbox
              value={true}
              color={APP_COLORS.primary_green}
              style={styles.checkBox}
            />
            <Text>Special offers</Text>
          </View>
          <View style={styles.checkBoxContainer}>
            <Checkbox
              value={true}
              color={APP_COLORS.primary_green}
              style={styles.checkBox}
            />
            <Text>Newsletter</Text>
          </View>

          <Spacer factor={0.5} />
          <View style={styles.buttonBottomContainer}>
            <TouchableOpacity
              style={[
                styles.button,
                { borderWidth: 2, borderColor: APP_COLORS.primary_green },
              ]}
            >
              <Text style={styles.buttonText}>Discard changes</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.button,
                { backgroundColor: APP_COLORS.primary_yellow },
              ]}
            >
              <Text style={styles.buttonText}>Save changes</Text>
            </TouchableOpacity>
          </View>

          <Spacer factor={0.5} />
          <View style={styles.divider} />

          <TouchableOpacity
            style={[
              styles.button,
              { backgroundColor: APP_COLORS.highlight_light, width: "100%" },
            ]}
          >
            <Text style={styles.buttonText}>Log out</Text>
          </TouchableOpacity>
          <Spacer />
        </ScrollView>
        <Spacer factor={0.2} />
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-start",
    backgroundColor: "#fff",
  },
  mainContainer: {
    flex: 1,
    width: "100%",
    paddingHorizontal: 20,
  },
  avatarContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    justifyContent: "space-between",
  },
  textCategory: {
    fontSize: 18,
    fontWeight: "bold",

    textAlign: "left",
    color: APP_COLORS.highlight_dark,
  },
  textLabel: {
    fontSize: 14,
    fontWeight: "400",
    paddingVertical: 10,
    left: 8,
    textAlign: "left",
    color: APP_COLORS.highlight_dark,
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

  checkBoxContainer: {
    flexDirection: "row",
    color: APP_COLORS.highlight_dark,
    paddingVertical: 10,
  },
  checkBox: {
    marginRight: 16,
  },
  button: {
    height: 40,
    paddingHorizontal: 10,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
  },
  buttonOutlined: {
    borderWidth: 2,
    borderColor: APP_COLORS.primary_green,
  },
  buttonBottomContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    width: "100%",
  },
  divider: {
    height: 2,
    width: "100%",
    borderRadius: 1,
    alignSelf: "center",
    paddingHorizontal: 10,
    marginVertical: 20,
    backgroundColor: APP_COLORS.highlight_light,
  },
});
