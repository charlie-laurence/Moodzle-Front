import React from "react";
import { LogBox } from "react-native";
LogBox.ignoreLogs(["Warning: ..."]);

import { StyleSheet, Text, View } from "react-native";
import { Provider } from "react-redux";
import { createStore, combineReducers } from "redux";
import { Ionicons } from "@expo/vector-icons";

import mood from "./reducers/mood.reducer";
import step from "./reducers/step.reducer";
import pseudo from "./reducers/pseudo.reducer";
import chartstep from "./reducers/chartstep.reducer";
import token from "./reducers/token.reducer";

import {
  useFonts,
  LondrinaSolid_400Regular,
} from "@expo-google-fonts/londrina-solid";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeScreen from "./screens/HomeScreen";
import MoodNavigation from "./screens/MoodNavigation";
import ChartNavigation from "./screens/ChartNavigation";
import ChartsWeekScreen from "./screens/ChartsWeekScreen";
import ChartsMonthScreen from "./screens/ChartsMonthScreen";
import ChartsYearScreen from "./screens/ChartsYearScreen";
import SettingsScreen from "./screens/SettingsScreen";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const store = createStore(combineReducers({ mood, step, chartstep, pseudo, token }));

const BottomNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color }) => {
          let iconName;

          if (route.name == "Charts") {
            iconName = "ios-pie-chart";
          } else if (route.name == "Mood") {
            iconName = "ios-happy";
          } else if (route.name == "Settings") {
            iconName = "ios-settings-sharp";
          }

          return <Ionicons name={iconName} size={25} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: "#009788",
        inactiveTintColor: "#FFFFFF",
        style: {
          backgroundColor: "#111224",
        },
      }}
    >
      <Tab.Screen name="Charts" component={ChartNavigation} />
      <Tab.Screen name="Mood" component={MoodNavigation} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
};

export default function App() {
  let [fontsLoaded] = useFonts({
    "LondrinaSolid-Regular": LondrinaSolid_400Regular,
  });

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Mood" component={MoodNavigation} /> 
          <Stack.Screen name="ChartsWeek" component={ChartsWeekScreen} />
          <Stack.Screen name="ChartsMonth" component={ChartsMonthScreen} />
          <Stack.Screen name="ChartsYear" component={ChartsYearScreen} />
          <Stack.Screen name="Settings" component={SettingsScreen} />
          <Stack.Screen name="BottomNavigator" component={BottomNavigator} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
