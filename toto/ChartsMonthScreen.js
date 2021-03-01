import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import {
  LineChart, // Bezier Line Chart // Variation Mood
  BarChart, // podium top activités si pas image
  PieChart, // Donut répartition mood
  ContributionGraph, // Calendrier
} from "react-native-chart-kit";


export default function ChartsMonthScreen(props) {
  return (
    <View>
        
      <Text style={styles.paragraph}>ChartsMonthScreen</Text>

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
