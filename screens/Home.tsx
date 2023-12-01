import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
} from "react-native";
import Header from "../components/Header";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { Avatar } from "../components/Avatar";
import { useFocusEffect } from "@react-navigation/native";
import React from "react";
import { APP_COLORS } from "../constants/colors";
import { APP_STYLES } from "../styles/appStyles";

const BannerImage = () => {
  return (
    <View style={styles.bannerImageContainer}>
      <Image
        style={styles.bannerImage}
        resizeMode="cover"
        source={require("../assets/images/header.png")}
      />
    </View>
  );
};

const SearchBar = () => {
  return (
    <View style={styles.searchBar}>
      <TextInput
        placeholder="Search for food..."
        style={APP_STYLES.textInput}
      ></TextInput>
    </View>
  );
};

const Banner = () => {
  return (
    <View style={styles.banner}>
      <Text style={styles.bannerTitle}>Little Lemon</Text>
      <View style={styles.bannerContent}>
        <View style={styles.bannerInnerContent}>
          <Text style={styles.bannerSubtitle}>Chicago</Text>
          <Text style={styles.bannerDescription}>
            We are a familiy owned Mediterranean restaurant, focused on
            traditional recipes served with a modern twist.
          </Text>
        </View>
        <BannerImage />
      </View>
      <SearchBar />
    </View>
  );
};

const Home = ({ navigation }: any) => {
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
      <ScrollView keyboardDismissMode="on-drag" style={styles.scrollView}>
        <Banner />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    // width: "100%",
  },
  scrollView: {
    flex: 1,
    width: "100%",
    // alignItems: "flex-end",
    // justifyContent: "flex-start",
    backgroundColor: "#fff",
    // paddingHorizontal: 50,
  },
  banner: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: APP_COLORS.primary_green,
  },
  bannerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  bannerInnerContent: {
    width: "60%",
    // top: 16,

    flexDirection: "column",
    // alignItems: "center",
    justifyContent: "center",
  },
  bannerTitle: {
    fontSize: 56,
    textAlign: "left",
    fontWeight: "600",
    fontFamily: "Markazi",
    color: APP_COLORS.primary_yellow,
  },
  bannerSubtitle: {
    fontSize: 36,
    fontWeight: "bold",
    fontFamily: "Markazi",
    color: APP_COLORS.highlight_light,
  },
  bannerDescription: {
    fontSize: 18,
    fontWeight: "600",
    fontFamily: "Karla",
    color: APP_COLORS.highlight_light,
  },
  bannerImageContainer: {
    width: 128,
    flexDirection: "column",
    alignSelf: "flex-end",
  },
  bannerImage: {
    height: 160,
    width: 128,
    borderRadius: 16,
    justifyContent: "center",
    backgroundColor: APP_COLORS.highlight_light,
  },
  searchBar: {
    paddingTop: 16,
  },
});

export default Home;
