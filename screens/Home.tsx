import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
  FlatList,
} from "react-native";
import Header from "../components/Header";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { Avatar } from "../components/Avatar";
import { useFocusEffect } from "@react-navigation/native";
import React from "react";
import { APP_COLORS } from "../constants/colors";
import { APP_STYLES } from "../styles/appStyles";
import { Spacer } from "../components/GeneralComponents";
import { MenuItemType } from "../types/types";
import {
  createTable,
  dropTable,
  filterByQueryAndCategories,
  getMenuItems,
  saveMenuItems,
  truncateTable,
} from "../data/database";

import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("little_lemon");
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

  // const [menu, setMenu] = useState([]:MenuItemType);
  const [menu, setMenu] = useState<MenuItemType[]>([]);

  const [searchInput, setSearchInput] = useState("");
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
          value={searchInput}
          onChangeText={(text) => setSearchInput(text)}
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

  // const MenuItem = (item: any) => {
  const MenuItem = (item: MenuItemType) => {
    // console.log(item);
    // const { name, price, category, description, image } = item["item"];
    // console.log("ITEM NAME:" + item.item.name);
    return (
      <View>
        <View style={styles.itemContainer}>
          <View style={styles.itemDescriptionContainer}>
            <Text style={styles.itemName}>
              {item.name}{" "}
              <Text style={styles.itemCategory}> - {item.category} -</Text>
            </Text>
            <Spacer factor={0.1} />
            <Text style={styles.itemDescription}>{item.description}</Text>
            <Spacer factor={0.2} />
            <Text style={styles.itemPrice}>$ {item.price}</Text>
          </View>

          <Image
            style={styles.itemImage}
            resizeMode="cover"
            source={{ uri: item.image }}
          />
        </View>
        <View style={[APP_STYLES.divider, { marginHorizontal: 50 }]} />
      </View>
    );
  };

  // TODO: filter here
  const [categories, setCategories] = useState({
    starters: false,
    mains: false,
    desserts: false,
    drinks: false,
  });

  useEffect(() => {
    const filter = async () => {
      const selectedCategories = getCategories();
      const menuItems = await filterByQueryAndCategories(
        searchInput,
        selectedCategories
      );
      setMenu(menuItems as MenuItemType[]);
    };
    filter();
  }, [categories, searchInput]);

  const getCategories = () => {
    // return Object.keys(cats).filter(
    //   (key) => categories[key as keyof typeof cats] === true
    return Object.keys(categories).filter(
      (key) => categories[key as keyof typeof categories] === true
    );
  };

  const onCategoryPress = async (category: string) => {
    const value = categories[category as keyof typeof categories];
    const newArray = { ...categories, [category]: !value };

    setCategories(newArray);
    // const selectedCategories = getCategories(newArray);
    // const menuItems = await filterByQueryAndCategories(
    //   searchInput,
    //   selectedCategories
    // );
    // console.log("MENU ITEMS::::: ");
    // console.log(menuItems);
    // setMenu(menuItems as MenuItemType[]);
  };

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

  const Filter = () => {
    return (
      <View style={styles.filterContainer}>
        <Text style={styles.filterTitle}>ORDER FOR DELIVERY!</Text>
        <View style={styles.filterButtonsContainer}>
          <TouchableOpacity
            onPress={() => onCategoryPress("starters")}
            style={[
              styles.filterButton,
              categories.starters
                ? styles.filterButtonSelected
                : styles.filterButtonUnSelected,
            ]}
          >
            <Text style={styles.filterButtonText}>Starters</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => onCategoryPress("mains")}
            style={[
              styles.filterButton,
              categories.mains
                ? styles.filterButtonSelected
                : styles.filterButtonUnSelected,
            ]}
          >
            <Text style={styles.filterButtonText}>Mains</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => onCategoryPress("desserts")}
            style={[
              styles.filterButton,
              categories.desserts
                ? styles.filterButtonSelected
                : styles.filterButtonUnSelected,
            ]}
          >
            <Text style={styles.filterButtonText}>Desserts</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => onCategoryPress("drinks")}
            style={[
              styles.filterButton,
              categories.drinks
                ? styles.filterButtonSelected
                : styles.filterButtonUnSelected,
            ]}
          >
            <Text style={styles.filterButtonText}>Drinks</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const loadMenuFromWeb = async () => {
    // console.log("GONNA LOAD MENU FROM WEB");
    const request = await fetch(
      "https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json"
    );
    const menuJson = await request.json();
    // console.log(menuJson.menu);
    const menuWithImage = menuJson.menu.map((item: MenuItemType) => {
      return {
        ...item,
        image: `https://github.com/Meta-Mobile-Developer-PC/Working-With-Data-API/blob/main/images/${item.image}?raw=true`,
      };
    });
    setMenu(menuWithImage);
    await saveMenuItems(menuWithImage);
  };

  useEffect(() => {
    // dropTable();
    // truncateTable();
    // return;
    try {
      const loadMenuFromDB = async () => {
        // console.log("GONNA LOAD MENU FROM DB");
        await createTable();
        // console.log(request1);
        // console.log("After create table");
        const menuItems = await getMenuItems();
        console.log(menuItems);

        if (Array.isArray(menuItems) && menuItems.length > 0) {
          // setMenu(menuItems);
          // console.log("MENU FROM DB ::::: ");
          // console.log(menuItems);

          setMenu(menuItems as MenuItemType[]);
        } else {
          // console.log("noting in menuItems");
          await loadMenuFromWeb();
        }
      };

      loadMenuFromDB();
    } catch (error) {
      console.error(error);
    }
  }, []);

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

  // const renderItem = ({ item }: any) => {
  const renderItem = (item: MenuItemType) => {
    // console.log("actual item::::: " + item);
    return MenuItem(item);
  };

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
        <Filter />
        <FlatList
          scrollEnabled={false}
          keyExtractor={(item) => item.name + item.price}
          data={menu}
          renderItem={({ item }: { item: MenuItemType }) => renderItem(item)}
          // renderItem={({ item }) => <MenuItem item={item} />}
        />
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
  filterContainer: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: APP_COLORS.primary_yellow_transparent,
  },
  filterButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  filterTitle: {
    fontSize: 22,
    fontWeight: "bold",
    // fontFamily: "Karla",
    color: APP_COLORS.highlight_dark,
    marginBottom: 10,
  },
  filterButton: {
    height: 40,
    width: 80,
    padding: 8,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  filterButtonSelected: {
    backgroundColor: APP_COLORS.primary_green,
  },
  filterButtonUnSelected: {
    backgroundColor: APP_COLORS.primary_green_transparent,
  },
  filterButtonText: {
    fontSize: 14,
    fontWeight: "bold",
    color: APP_COLORS.highlight_light,
    // fontFamily: "karla",
  },

  itemContainer: {
    paddingHorizontal: 24,
    paddingVertical: 16,

    // backgroundColor: APP_COLORS.highlight_light,
    flexDirection: "row",
    justifyContent: "space-between",
    // alignItems: "center",
  },
  itemDescriptionContainer: {
    width: "60%",
    flexDirection: "column",
    // alignItems: "center",
    justifyContent: "center",
  },

  itemName: {
    fontSize: 24,
    fontWeight: "bold",
    fontFamily: "Markazi",
    color: APP_COLORS.primary_green,
  },
  itemCategory: {
    fontSize: 12,
    fontWeight: "bold",
    fontFamily: "Karla",
    textAlign: "right",
    alignContent: "center",
    color: APP_COLORS.primary_green_transparent,
  },
  itemPrice: {
    fontSize: 18,
    fontWeight: "600",
    fontFamily: "Karla",
    color: APP_COLORS.highlight_dark,
  },
  itemDescription: {
    fontSize: 14,

    fontWeight: "600",
    fontFamily: "Karla",
    color: APP_COLORS.highlight_dark,
  },
  itemImage: {
    height: 100,
    width: 100,
    borderRadius: 8,
    alignSelf: "center",
    // alignSelf: "flex-end",
    backgroundColor: APP_COLORS.highlight_light,
  },
});

export default Home;
