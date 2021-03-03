import React from "react";
import ActivityScreen from "./ActivityScreen";
import MoodScreen from "./MoodScreen";
import ReactionScreen from "./ReactionScreen";
import HistoryScreen from "./HistoryScreen";
import { connect } from "react-redux";
import { Button, View, Text, Stylesheet } from "react-native";

function MoodNavigation({ step }) {
  switch (step) {
    case 1:
      return (
        <View>
          <MoodScreen />
        </View>
      );
    case 2:
      return (
        <View>
          <ActivityScreen />
        </View>
      );
    case 3:
      return (
        <View>
          <ReactionScreen />
        </View>
      );
    case 4:
      return (
        <View>
          <HistoryScreen />
        </View>
      );
    default:
      return (
        <View>
          <Text>Loading...</Text>
        </View>
      );
  }
}

const mapStateToProps = (state) => {
  return { step: state.step };
};

export default connect(mapStateToProps, null)(MoodNavigation);
