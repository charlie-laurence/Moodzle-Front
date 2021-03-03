import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
// Calendrier
import { connect } from "react-redux";

import {ContributionGraph} from "react-native-chart-kit";


// Contribution graph (heatmap)

function ChartsYearScreen(props) {
  return (
    <View>
        <Text style={styles.paragraph}>ChartsYearScreen</Text>
      <Button
        title="WEEK"
        type="solid"
        buttonStyle={{ backgroundColor: "#009788" }}
        onPress={() => {
          props.changeStep(1)
        }}
      />
      <Button
        title="MONTH"
        type="solid"
        buttonStyle={{ backgroundColor: "#009788" }}
        onPress={() => {
          props.changeStep(2)
        }}
      />
      <Button
        title="YEAR"
        type="solid"
        buttonStyle={{ backgroundColor: "#009788" }}
        onPress={() => {
          props.changeStep(3)
        }}
      />
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  paragraph: {
    fontWeight: "bold",
    fontSize: 30,
    textAlign: "center",
    color: "#009788",
    marginTop: 70
  },
});

const mapDispatchToProps = (dispatch) => {
  return {
    changeStep: (newstep) => {
      dispatch({ type: "change-step", newstep: newstep});
    },
  };
};

export default connect(null, mapDispatchToProps)(ChartsYearScreen);
