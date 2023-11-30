import { StyleSheet, View } from "react-native";
import { OnBoarding } from "./screens/OnBoarding";
import { APP_COLORS } from "./constants/colors";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Profile from "./screens/Profile";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import Splash from "./screens/Splash";
import Home from "./screens/Home";

const Stack = createNativeStackNavigator();

export default function App() {
  const [state, setState] = useState({
    isLoading: true,
    isOnBoardingComplete: false,
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
        const isOnBoarding = await AsyncStorage.getItem("isOnBoardingComplete");
        console.log("isOnBoarding", isOnBoarding);
        setState({
          isLoading: false,
          isOnBoardingComplete: isOnBoarding === "true",
        });
      } catch (error) {
        console.error(error);
      }
    };

    loadData();
  }, []);

  // Show Splash screen while loading the async storage data.
  if (state.isLoading) return <Splash />;

  const initialRouteName = state.isOnBoardingComplete ? "Home" : "OnBoarding";

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={initialRouteName}>
        <Stack.Screen
          name="OnBoarding"
          component={OnBoarding}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
