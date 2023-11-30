import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { APP_COLORS } from "../constants/colors";
import { Spacer, SPACE_SIZE } from "../components/GeneralComponents";
import { useState } from "react";
import { validateEmail } from "../utils/validations";

const TopImage = () => {
  const location = "../assets/images/customer-smile.jpg";

  return (
    <Image source={require(location)} style={styles.image} resizeMode="cover" />
  );
};

const Form = () => {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [isFormValid, setFormIsValid] = useState(false);

  const validateForm = (name: string, email: string) => {
    const isFormValid = name.length > 0 && validateEmail(email);
    setFormIsValid(isFormValid);
  };

  const onNameChange = (name: string) => {
    setFirstName(name);
    validateForm(name, email);
  };

  const onEmailChange = (email: string) => {
    setEmail(email);
    validateForm(firstName, email);
  };

  const buttonStyle = isFormValid
    ? styles.buttonEnabled
    : styles.buttonDisabled;

  return (
    <ScrollView keyboardDismissMode={"on-drag"} style={styles.Form}>
      <Spacer />
      <Text style={styles.welcomeText}>Let us get to know you</Text>
      <Spacer factor={0.5} />
      <Text style={styles.labelText}>First Name</Text>
      <Spacer factor={0.2} />
      <TextInput
        placeholder="Kevin"
        value={firstName}
        onChangeText={onNameChange}
        style={styles.textInput}
      />
      <Spacer factor={0.5} />
      <Text style={styles.labelText}>Email</Text>
      <Spacer factor={0.2} />
      <TextInput
        value={email}
        placeholder="kegadev@littlelemon.com"
        keyboardType="email-address"
        onChangeText={onEmailChange}
        style={styles.textInput}
      />
      <Spacer />

      <View style={styles.buttonContainer}>
        <TouchableOpacity disabled={!isFormValid}>
          <View style={[styles.button, buttonStyle]}>
            <Text style={styles.buttonText}>Next</Text>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default function OnBoarding() {
  return (
    <View style={styles.container}>
      <Header />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <TopImage />
          <Form />
        </ScrollView>
      </KeyboardAvoidingView>
      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: APP_COLORS.primary_green,
  },
  scrollContainer: {
    flex: 1,
    justifyContent: "flex-start",
  },
  Form: {
    paddingHorizontal: SPACE_SIZE,
  },
  image: {
    width: "100%",
    maxHeight: 260,
  },
  welcomeText: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    color: APP_COLORS.highlight_light,
  },
  labelText: {
    left: 8,
    fontSize: 16,
    textAlign: "left",
    fontWeight: "bold",
    color: APP_COLORS.highlight_light,
  },
  textInput: {
    height: 40,
    fontSize: 16,
    width: "100%",
    borderRadius: 8,
    fontWeight: "bold",
    paddingHorizontal: 10,
    color: APP_COLORS.highlight_dark,
    backgroundColor: APP_COLORS.highlight_light,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  button: {
    height: 40,
    width: 110,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    color: APP_COLORS.highlight_dark,
  },
  buttonEnabled: {
    backgroundColor: APP_COLORS.primary_yellow,
  },
  buttonDisabled: {
    backgroundColor: APP_COLORS.highlight_dark,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
  },
});
