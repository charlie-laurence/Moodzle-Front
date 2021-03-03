import React from "react";
import { StyleSheet, Text, View, Dimensions, Image } from "react-native";
import { connect } from "react-redux";
import { FontAwesome5 } from "@expo/vector-icons";

function ActivityScreen({ selectMood, mood, incrementStep, step }) {
  return (
    <View style={styles.container}>
      <Text>
        Activity Screen {step} - Mood {mood}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F0FFF8",
    alignItems: "center",
    justifyContent: "center",
    height: Dimensions.get("window").height,
  },
  //   moodz: {
  //     position: "absolute",
  //     width: 236,
  //     height: 396,
  //     left: -90,
  //     top: -200,
  //     zIndex: 1,
  //     // transform: "rotate(178.23deg)",
  //   }
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
