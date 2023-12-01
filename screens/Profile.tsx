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
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { validateEmail } from "../utils/validations";
import { pickImage } from "../utils/pickImage";

export default function Profile({ navigation }: any) {
  const [state, setState] = useState({
    name: "",
    lastName: "",
    image: "",
    email: "",
    phoneNumber: "",
    orderStatus: false,
    avatarCharacters: "",
    passwordChanges: true,
    specialOffers: false,
    newsletter: false,
    isOnBoardingComplete: false,
  });
  const [prefs, setPrefs] = useState({});

  function asignDefaulValues(prefsJson: any = {}) {
    setState({
      ...state,
      name: prefsJson.name || "",
      image: prefsJson.image || "",
      lastName: prefsJson.lastName || "",
      email: prefsJson.email || "",
      avatarCharacters: prefsJson.avatarCharacters || "",
      phoneNumber: prefsJson.phoneNumber || "",
      orderStatus: prefsJson.orderStatus || false,
      passwordChanges: prefsJson.passwordChanges || false,
      specialOffers: prefsJson.specialOffers || false,
      newsletter: prefsJson.newsletter || false,
    });
  }

  useEffect(() => {
    const loadData = async () => {
      // Get Data from async storage.
      try {
        const prefs = await AsyncStorage.getItem("@prefs");
        console.log(prefs);

        if (prefs === null) return;
        const prefsJson = JSON.parse(prefs);
        setPrefs(prefsJson);
        asignDefaulValues(prefsJson);
      } catch (error) {
        console.error(error);
      }
    };

    loadData();
  }, []);

  const saveOnPrefs = async () => {
    if (
      state.name.trim() === "" ||
      state.lastName.trim() === "" ||
      state.email.trim() === "" ||
      state.phoneNumber.trim() === ""
    ) {
      alert("Please fill all the text fields");
      return;
    } else if (!validateEmail(state.email)) {
      alert("Please enter a valid email");
      return;
    } else {
      const isValidPhone = /^\d{10}$/.test(state.phoneNumber);
      if (!isValidPhone) {
        alert("Please enter a valid phone number");
        return;
      }
    }

    try {
      const newPrefs = {
        name: state.name,
        lastName: state.lastName,
        image: state.image,
        email: state.email,
        phoneNumber: state.phoneNumber,
        orderStatus: state.orderStatus,
        avatarCharacters: state.avatarCharacters,
        passwordChanges: state.passwordChanges,
        specialOffers: state.specialOffers,
        newsletter: state.newsletter,
        isOnBoardingComplete: true,
      };

      const prefsString = JSON.stringify(newPrefs);
      console.log("PREFS STRING");
      console.log(prefsString);
      await AsyncStorage.mergeItem("@prefs", prefsString);
      alert("Changes saved");
      navigation.goBack();
    } catch (error) {
      console.error(error);
    }
  };

  const logOut = async () => {
    await deletePrefs();
    navigation.reset({
      index: 0,
      routes: [{ name: "OnBoarding" }],
    });
  };

  const deletePrefs = async () => {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.error(error);
    }
  };

  const onChangeImage = async () => {
    const image = await pickImage();
    console.log(image);
    if (image) {
      setState({ ...state, image: image, avatarCharacters: "" });
    }
  };

  const getAvatarCharacters = () => {
    if (
      !state.name ||
      !state.lastName ||
      state.name?.trim() === "" ||
      state.lastName?.trim() === ""
    ) {
      return "";
    }

    const name = state.name.trim().charAt(0).toUpperCase();
    const lastName = state.lastName.trim().charAt(0).toUpperCase();

    return name + lastName;
  };

  const onDefaultImage = () => {
    setState({ ...state, image: "", avatarCharacters: "" });
  };

  const onRemoveImage = () => {
    const chars = getAvatarCharacters();
    if (chars === "") {
      alert(
        "Please fill the name and last name fields to assign a default avatar with your initials"
      );
    }
    setState({
      ...state,
      image: "",
      avatarCharacters: chars,
    });
  };

  return (
    <View style={styles.container}>
      <Header showBackButton navigation={navigation} />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.mainContainer}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardDismissMode={"on-drag"}
        >
          <Spacer factor={0.5} />
          <Text style={styles.textCategory}>Personal Information</Text>
          <Spacer factor={0.2} />
          <Text style={styles.textLabel}>Avatar</Text>
          {/* <ImagePickerExample /> */}
          <View style={styles.avatarContainer}>
            <Avatar
              onPress={onChangeImage}
              avatarSize={AvatarSize.LARGE}
              imageUrl={state.image}
              text={state.avatarCharacters}
            />
            <TouchableOpacity
              onPress={onDefaultImage}
              style={[
                styles.button,
                { backgroundColor: APP_COLORS.highlight_light },
              ]}
            >
              <Text style={styles.buttonText}>Default</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onRemoveImage}
              style={[styles.button, styles.buttonOutlined]}
            >
              <Text style={styles.buttonText}>Remove</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.textLabel}>First name</Text>
          <TextInput
            placeholder="Kevin"
            value={state.name}
            maxLength={50}
            onChangeText={(value) => setState({ ...state, name: value })}
            style={styles.textInput}
          />
          <Text style={styles.textLabel}>Last name</Text>
          <TextInput
            placeholder="Garcia"
            value={state.lastName}
            maxLength={50}
            onChangeText={(value) => setState({ ...state, lastName: value })}
            style={styles.textInput}
          />
          <Text style={styles.textLabel}>Email</Text>
          <TextInput
            placeholder="kegadev@littlelemon.com"
            value={state.email}
            maxLength={50}
            keyboardType="email-address"
            onChangeText={(value) => setState({ ...state, email: value })}
            style={styles.textInput}
          />
          <Text style={styles.textLabel}>Phone number</Text>
          <TextInput
            placeholder="1234567890"
            maxLength={10}
            keyboardType="phone-pad"
            value={state.phoneNumber}
            onChangeText={(value) => setState({ ...state, phoneNumber: value })}
            style={styles.textInput}
          />
          <Spacer factor={0.4} />
          <Text style={styles.textCategory}>Email notifications</Text>
          <Spacer factor={0.2} />
          <View style={styles.checkBoxContainer}>
            <Checkbox
              value={state.orderStatus}
              onValueChange={(value) =>
                setState({ ...state, orderStatus: value })
              }
              color={APP_COLORS.primary_green}
              style={styles.checkBox}
            />
            <Text>Order statuses</Text>
          </View>
          <View style={styles.checkBoxContainer}>
            <Checkbox
              value={state.passwordChanges}
              onValueChange={(value) =>
                setState({ ...state, passwordChanges: value })
              }
              color={APP_COLORS.primary_green}
              style={styles.checkBox}
            />
            <Text>Password changes</Text>
          </View>
          <View style={styles.checkBoxContainer}>
            <Checkbox
              value={state.specialOffers}
              onValueChange={(value) =>
                setState({ ...state, specialOffers: value })
              }
              color={APP_COLORS.primary_green}
              style={styles.checkBox}
            />
            <Text>Special offers</Text>
          </View>
          <View style={styles.checkBoxContainer}>
            <Checkbox
              value={state.newsletter}
              onValueChange={(value) =>
                setState({ ...state, newsletter: value })
              }
              color={APP_COLORS.primary_green}
              style={styles.checkBox}
            />
            <Text>Newsletter</Text>
          </View>

          <Spacer factor={0.5} />
          <View style={styles.buttonBottomContainer}>
            <TouchableOpacity
              onPress={() => asignDefaulValues(prefs)}
              style={[
                styles.button,
                { borderWidth: 2, borderColor: APP_COLORS.primary_green },
              ]}
            >
              <Text style={styles.buttonText}>Discard changes</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={saveOnPrefs}
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
            onPress={logOut}
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
