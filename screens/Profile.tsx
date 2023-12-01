import { View, Text, StyleSheet, ScrollView } from "react-native";
import Header from "../components/Header";
import { Avatar, AvatarSize } from "../components/Avatar";

export default function Profile({ navigation }: any) {
  return (
    <View style={styles.container}>
      <Header showBackButton navigation={navigation} />
      <ScrollView>
        <Text>Personal Information</Text>
        <Avatar avatarSize={AvatarSize.LARGE} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    alignItems: "flex-start",
    backgroundColor: "#fff",
  },
});
