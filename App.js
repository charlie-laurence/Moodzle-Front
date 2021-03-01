import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Provider } from "react-redux";
import { createStore, combineReducers } from "redux";
import mood from "./reducers/mood.reducer";
import step from "./reducers/step.reducer";
import {
  useFonts,
  LondrinaSolid_400Regular,
} from "@expo-google-fonts/londrina-solid";
import MoodNavigation from "./screens/MoodNavigation";

const store = createStore(combineReducers({ mood, step }));

export default function App() {
  let [fontsLoaded] = useFonts({
    "LondrinaSolid-Regular": LondrinaSolid_400Regular,
  });

  return (
    <Provider store={store}>
      <View style={styles.container}>
        <MoodNavigation />
      </View>
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
