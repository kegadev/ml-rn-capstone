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

const TopImage = () => {
  const location = "../assets/images/customer-smile.jpg";

  return (
    <Image source={require(location)} style={styles.image} resizeMode="cover" />
  );
};

export default function OnBoarding() {
  const MainContent = () => {
    return (
      <ScrollView keyboardDismissMode={"on-drag"} style={styles.mainContent}>
        <Spacer />
        <Text style={styles.welcomeText}>Let us get to know you</Text>
        <Spacer factor={0.5} />
        <Text style={styles.labelText}>First Name</Text>
        <Spacer factor={0.2} />
        <TextInput style={styles.textInput} />
        <Spacer factor={0.5} />
        <Text style={styles.labelText}>Last Name</Text>
        <Spacer factor={0.2} />
        <TextInput style={styles.textInput} />
        <Spacer />
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  };

  return (
    <View style={styles.container}>
      <Header />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <TopImage />
          <MainContent />
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
  mainContent: {
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
    alignSelf: "center",
    alignItems: "center",
    paddingHorizontal: 10,
    justifyContent: "center",
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
    backgroundColor: APP_COLORS.primary_yellow,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
  },
});
