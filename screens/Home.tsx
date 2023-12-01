import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Header from "../components/Header";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { Avatar } from "../components/Avatar";
import { useFocusEffect } from "@react-navigation/native";
import React from "react";

export default function Home({ navigation }: any) {
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

  useFocusEffect(
    React.useCallback(() => {
      const loadData = async () => {
        // Get Data from async storage.
        try {
          const prefs = await AsyncStorage.getItem("@prefs");

          if (prefs === null) return;
          const prefsJson = JSON.parse(prefs);
          asignDefaulValues(prefsJson);
        } catch (error) {
          console.error(error);
        }
      };

      loadData();
      console.log("detect focus");
    }, [])
  );

  return (
    <View style={styles.container}>
      <Header
        avatar={
          <Avatar
            imageUrl={state.image}
            text={state.avatarCharacters}
            onPress={() => navigation.navigate("Profile")}
          ></Avatar>
        }
        navigation={navigation}
      />
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
