import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function Home({ navigation }: any) {
  const goToProfile = () => {
    navigation.navigate("Profile");
  };

  return (
    <View style={styles.container}>
      <Text>Home</Text>
      <TouchableOpacity onPress={goToProfile}>
        <Text>Go To profile</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
});
