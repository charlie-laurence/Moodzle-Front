import React, {useState, useEffect} from "react";
import { StyleSheet, Text, View, Button, Dimensions } from "react-native";
import {PieChart} from "react-native-chart-kit";


export default function ChartsMonthScreen(props) {

  const [pieData, setPieData] = useState([])

  const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0.5,
    strokeWidth: 2,
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    barPercentage: 0.5,
  };
  

  var fetchData = async () => {
    var dataRaw = await fetch('http://172.17.1.144:3000/history', {
        method: 'POST',
        headers: {'Content-Type':'application/x-www-form-urlencoded'}
    });

    var data = await dataRaw.json()
    console.log(data.history)

    var dataHistory = data.history

    let score1 = 0
    let score2 = 0
    let score3 = 0
    let score4 = 0
    let score5 = 0

    for (let i = 0; i < dataHistory.length; i ++) {
      switch (dataHistory[i].mood_score) {
        case 1: 
          score1 += 1
          break;
        case 2: 
          score2 += 1
          break;
        case 3: 
          score3 += 1
          break;
        case 4: 
          score4 += 1
          break;
        case 5: 
          score5 += 1
          break;
      }
    }

    setPieData([
      {score: 1, count: score1, color:"#CD6133"}, 
      {score: 2, count: score2, color:"#F0A07E"}, 
      {score: 3, count: score3, color:"#F0D231"}, 
      {score: 4, count: score4, color:"#44B79D"}, 
      {score: 5, count: score5, color:"#54857F"}])
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <View>
        
      <Text style={styles.paragraph}>ChartsMonthScreen</Text>

      <PieChart
        data={pieData}
        width={Dimensions.get("window").width}
        height={220}
        chartConfig={chartConfig}
        accessor={"count"}
        backgroundColor={"transparent"}
        absolute
        hasLegend={false}  
      />


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
