import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Header from "../components/Header";

export default function Home({ navigation }: any) {
  return (
    <View style={styles.container}>
      <Header showProfileButton navigation={navigation} />
      <Text>Home</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "#fff",
  },
});
