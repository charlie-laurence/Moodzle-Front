import React from "react";
import { View } from "react-native";
import { connect } from "react-redux";
import MoodScreen from "./MoodScreen";
import ActivityScreen from "./ActivityScreen";
import ReactionScreen from "./ReactionScreen";
import HistoryScreen from "./HistoryScreen";

function MoodNavigation({ step, login }) {
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
  }
}

function mapDispatchToProps(dispatch) {
  return {
    login: () => {
      dispatch({ type: "connexion" });
    },
  };
}

const mapStateToProps = (state) => {
  return { step: state.step };
};

export default connect(mapStateToProps, mapDispatchToProps)(MoodNavigation);
