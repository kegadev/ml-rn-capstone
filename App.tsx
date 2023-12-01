import { StyleSheet, View } from "react-native";
import { OnBoarding } from "./screens/OnBoarding";
import { APP_COLORS } from "./constants/colors";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Profile from "./screens/Profile";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import Splash from "./screens/Splash";
import { useFonts } from "expo-font";
import Home from "./screens/Home";

const Stack = createNativeStackNavigator();

export default function App() {
  const [state, setState] = useState({
    isLoading: true,
    isOnBoardingComplete: false,
  });

  const [fontsLoaded] = useFonts({
    Karla: require("./assets/fonts/Karla-Regular.ttf"),
    Markazi: require("./assets/fonts/MarkaziText-Regular.ttf"),
  });

  useEffect(() => {
    const loadData = async () => {
      // To simulate a loading time for the splash screen.
      const sleep = (milliseconds: number) => {
        return new Promise((resolve) => setTimeout(resolve, milliseconds));
      };
      await sleep(500);

      // Get Data from async storage.
      try {
        const prefs = await AsyncStorage.getItem("@prefs");
        // console.log(prefs);
        let isOnBoarding = false;

        if (prefs != null) {
          isOnBoarding = JSON.parse(prefs).isOnBoardingComplete || false;
        }

        setState({
          isLoading: false,
          isOnBoardingComplete: isOnBoarding,
        });
      } catch (error) {
        console.error(error);
      }
    };

    loadData();
  }, []);

  // Show Splash screen while loading the async storage data.
  if (state.isLoading || !fontsLoaded) return <Splash />;

  const initialRouteName = state.isOnBoardingComplete ? "Home" : "OnBoarding";

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={initialRouteName}>
        <Stack.Screen
          name="OnBoarding"
          component={OnBoarding}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
