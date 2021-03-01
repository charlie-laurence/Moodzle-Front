import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Provider } from "react-redux";
import { createStore, combineReducers } from "redux";
import { Ionicons } from '@expo/vector-icons';

import mood from "./reducers/mood.reducer";

// import { LogBox } from 'react-native';
// LogBox.ignoreLogs(['Warning: ...']);

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from './Screens/HomeScreen';
import MoodScreen from './Screens/MoodScreen';
import ActivityScreen from './Screens/ActivityScreen';
import ReactionScreen from './Screens/ReactionScreen';
import HistoryScreen from './Screens/HistoryScreen';
import ChartsWeekScreen from './Screens/ChartsWeekScreen';
import ChartsMonthScreen from './Screens/ChartsMonthScreen';
import ChartsYearScreen from './Screens/ChartsYearScreen';
import SettingsScreen from './Screens/SettingsScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();


const BottomNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color }) => {
          let iconName;

          if (route.name == 'Charts') {
            iconName = 'ios-pie-chart';
          } else if (route.name == 'Mood') {
            iconName = 'ios-happy';
          } else if (route.name == 'Settings') {
            iconName = 'ios-settings-sharp';
          }
  
          return <Ionicons name={iconName} size={25} color={color} />;
        },
        })}
      tabBarOptions={{
        activeTintColor: '#009788',
        inactiveTintColor: '#FFFFFF',
        style: {
          backgroundColor: '#111224',
        }
      }}
    >
      <Tab.Screen name="Charts" component={ChartsWeekScreen} />
      <Tab.Screen name="Mood" component={MoodScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}


const store = createStore(combineReducers({ mood }));

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Mood" component={MoodScreen} />
          <Stack.Screen name="Activity" component={ActivityScreen} />
          <Stack.Screen name="Reaction" component={ReactionScreen} />
          <Stack.Screen name="History" component={HistoryScreen} />
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
