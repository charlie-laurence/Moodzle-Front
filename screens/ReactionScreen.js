import React from "react";
import { StyleSheet, Text, View, Dimensions, Image } from "react-native";
import { Button } from "react-native-elements";
import { connect } from "react-redux";
import {
  useFonts,
  LondrinaSolid_400Regular,
} from "@expo-google-fonts/londrina-solid";

function ReactionScreen({ mood, incrementStep }) {
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
        <Image style={styles.liane} source={require("../assets/liane2.png")} />
        <Image style={styles.moodz} source={require("../assets/moodz.png")} />
        <View style={styles.btnContainer}>
          <Button
            buttonStyle={{ backgroundColor: "#fff", width: 60 }}
            title={"OK"}
            titleStyle={{ color: "#5B63AE", fontSize: 16, padding: 10 }}
            onPress={() => {
              incrementStep();
            }}
          />
        </View>
        <View style={styles.reaction}>
          <Text
            style={{
              fontFamily: "LondrinaSolid_400Regular",
              fontSize: 35,
              color: "#DF8F4A",
            }}
          >
            Mood : {mood}
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F0FFF9",
    alignItems: "center",
    justifyContent: "center",
    height: Dimensions.get("window").height,
  },
  paragraph: {
    fontWeight: "bold",
    fontSize: 30,
    textAlign: "center",
    color: "#009788",
  },
  btnContainer: {
    flex: 0.5,
    flexDirection: "row",
    justifyContent: "flex-end",
    width: Dimensions.get("window").width,
    marginTop: 15,
    padding: 25,
  },
  reaction: {
    flex: 1,
    // justifyContent: "flex-start",
    // alignItems: "flex-start",
  },
  liane: {
    position: "absolute",
    width: 560,
    height: 485,
    left: -110,
    top: -230,
  },
  moodz: {
    position: "absolute",
    width: 340,
    height: 565,
    left: 125,
    top: 375,
    zIndex: 1,
  },
});

const mapDispatchToProps = (dispatch) => {
  return {
    incrementStep: () => {
      dispatch({ type: "next-step" });
    },
  };
};

const mapStateToProps = (state) => {
  return {
    mood: state.mood,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ReactionScreen);
