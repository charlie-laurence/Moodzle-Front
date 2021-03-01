import React from "react";
import { StyleSheet, Text, View, Dimensions, Image } from "react-native";
import { connect } from "react-redux";
import { FontAwesome5 } from "@expo/vector-icons";
import {
  useFonts,
  LondrinaSolid_400Regular,
} from "@expo-google-fonts/londrina-solid";

function ActivityScreen({ selectMood, mood, incrementStep, step }) {
  const moodData = [
    {
      icon: "angry",
      color: "#CD6133",
    },
    {
      icon: "sad-cry",
      color: "#F0A07E",
    },
    {
      icon: "meh",
      color: "#F0D231",
    },
    {
      icon: "grin-squint",
      color: "#44B79D",
    },
    {
      icon: "smile-beam",
      color: "#54857F",
    },
  ];
  let [fontsLoaded] = useFonts({
    LondrinaSolid_400Regular,
  });

  if (!fontsLoaded) {
    return (
      <View>
        <Text>App is loading</Text>
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <Text>Activity Screen</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F0FFF9",
    alignItems: "center",
    justifyContent: "center",
  },
  moodContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    width: Dimensions.get("window").width,
    padding: 20,
    marginTop: 75,
  },
  moodz: {
    position: "absolute",
    width: 236,
    height: 396,
    left: -90,
    top: -200,
    zIndex: 1,
    // transform: "rotate(178.23deg)",
  },
  liane: {
    position: "absolute",
    width: 546,
    height: 585,
    left: -158,
    top: -410,
  },
  textMoodz: {
    position: "absolute",
    top: 175,
    left: 150,
    width: 150,
    textAlign: "center",
    fontFamily: "LondrinaSolid_400Regular",
    color: "#5B63AE",
    fontSize: 25,

    // marginTop: 200,
  },
});

const mapDispatchToProps = (dispatch) => {
  return {
    selectMood: (score) => {
      dispatch({ type: "select-mood", score });
    },
    incrementStep: () => {
      dispatch({ type: "next-step" });
    },
  };
};

const mapStateToProps = (state) => {
  return { mood: state.mood, step: state.step };
};

export default connect(mapStateToProps, mapDispatchToProps)(ActivityScreen);
