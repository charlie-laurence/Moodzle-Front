import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { connect } from "react-redux";

import {
  LineChart, // Bezier Line Chart // Variation Mood
  BarChart, // podium top activités si pas image
  PieChart, // Donut répartition mood
  ContributionGraph, // Calendrier
} from "react-native-chart-kit";


function ChartsMonthScreen(props) {
  return (
    <View>
        <Text style={styles.paragraph}>ChartsMonthScreen</Text>
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

export default connect(null, mapDispatchToProps)(ChartsMonthScreen);
