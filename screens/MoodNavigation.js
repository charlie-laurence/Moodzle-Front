import React, { useEffect } from "react";
import ActivityScreen from "./ActivityScreen";
import MoodScreen from "./MoodScreen";
// import ReactionScreen from "./ReactionScreen";
import HistoryScreen from "./HistoryScreen";
import { connect } from "react-redux";
import { View } from "react-native";
import ReactionScreen from "./ReactionScreen";

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
