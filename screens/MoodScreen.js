import React from "react";
import { StyleSheet, Text, View, Dimensions, ImageBackground, } from "react-native";
import { connect } from "react-redux";
import { FontAwesome5 } from "@expo/vector-icons";
import {
  useFonts,
  LondrinaSolid_400Regular,
} from "@expo-google-fonts/londrina-solid";
import AsyncStorage from "@react-native-async-storage/async-storage";

function MoodScreen({ selectMood, mood, incrementStep, step, pseudo }) {
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

  const icons = moodData.map((mood, index) => (
    <FontAwesome5
      key={mood.icon}
      name={mood.icon}
      size={50}
      color={mood.color}
      score={index + 1}
      onPress={() => handleMoodPress(index + 1)}
    />
  ));

  const handleMoodPress = (score) => {
    selectMood(score);
    incrementStep();
    // AsyncStorage.clear();
  };

  if (!fontsLoaded) {
    return (
      <View>
        <Text>App is loading</Text>
      </View>
    );
  } else {
    return (
        <ImageBackground source={require("../assets/MoodScreen.png")} style={styles.container}>
        <Text style={[styles.textMoodz, { transform: [{ rotate: "20deg" }] }]}>
          Quelle est ton humeur du jour {pseudo} ?
        </Text>
        <View style={styles.moodContainer}>{icons}</View>
        </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#CEFFEB",
    alignItems: "center",
    justifyContent: "center",
    alignItems: "center",
    height: Dimensions.get("window").height,
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
  textMoodz: {
    position: "absolute",
    top: 200,
    left: 180,
    width: 200,
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
  return {
    mood: state.mood,
    step: state.step,
    pseudo: state.pseudo,
    token: state.token,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MoodScreen);
