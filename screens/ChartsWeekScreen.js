import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { connect } from "react-redux";

import {
  LineChart, // Bezier Line Chart / Variation Mood (courbe)
  PieChart, // répartition mood (demi donut)
} from "react-native-chart-kit";



// Bezier Line Chart
//   <LineChart
//   data={data}
//   width={screenWidth}
//   height={256}
//   verticalLabelRotation={30}
//   chartConfig={chartConfig}
//   bezier
// />

export default function ChartsWeekScreen(props) {
  return (
    <View>
        <Text style={styles.paragraph}>ChartsWeekScreen</Text>
      <Button
        title="WEEK"
        type="solid"
        buttonStyle={{ backgroundColor: "#009788" }}
        onPress={() => {
          props.navigation.navigate("ChartsWeek");
        }}
      />
      <Button
        title="MONTH"
        type="solid"
        buttonStyle={{ backgroundColor: "#009788" }}
        onPress={() => {
          props.navigation.navigate("ChartsMonth");
        }}
      />
      <Button
        title="YEAR"
        type="solid"
        buttonStyle={{ backgroundColor: "#009788" }}
        onPress={() => {
          props.navigation.navigate("ChartsYear");
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

export default connect(mapStateToProps, mapDispatchToProps)(MoodScreen);
