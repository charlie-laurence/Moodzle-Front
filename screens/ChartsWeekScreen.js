import React, {useState, useEffect} from "react";
import { StyleSheet, Text, View, Button, Dimensions } from "react-native";
import { connect } from "react-redux";

import {
  LineChart, // Bezier Line Chart / Variation Mood (courbe)
  PieChart, // répartition mood (demi donut)
} from "react-native-chart-kit";
import { FontAwesome5, FontAwesomeIcon } from "@expo/vector-icons";


function ChartsWeekScreen(props) { 

const [dataChart, setDataChart] = useState([0, 0, 0, 0, 0, 0, 0])

//Récupération du résultat renvoyé par le backend

var fetchData = async() => {
  var rawDatas = await fetch("http://172.17.1.159:3000/history", {
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
  }
});

  var datas = await rawDatas.json();
  var dataHistory = datas.history
  var setterdataChart = []
  for (var i = 0 ; i < 7 ; i++) {
    if (dataHistory[i] === undefined || dataHistory[i].mood_score === undefined) 
    {
      setterdataChart.push(0)
      // dataHistory[i].mood_score = 0
    } else {
      setterdataChart.push(parseInt(dataHistory[i].mood_score))
  }}
  // console.log('i', setterdataChart)
  setDataChart(setterdataChart)
}
  
useEffect(() => {
  fetchData()
}, []);
   
function BezierChart() {
  return (
  <LineChart
  data={{
  labels: ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"],
  datasets: [
    {
      data: dataChart
    }
  ]
  }}
    width={Dimensions.get("window").width} 
    height={220}
    // yAxisLabel="$"
    // yAxisSuffix="k"
    yAxisInterval={1} // optional, defaults to 1
    chartConfig={chartConfig}
    bezier
    style={{
      marginVertical: 8,
      borderRadius: 16}}
  />)}

  return (
    <View>
        <Text style={styles.paragraph}>ChartsWeekScreen</Text>

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
      <BezierChart />

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

const chartConfig = {
  backgroundGradientFrom: "#ffffff",
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: "#ffffff",
  backgroundGradientToOpacity: 0,

  decimalPlaces: 0, // optional
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  labelColor: (opacity = 1) => `#44B79D`,
  style: {
    borderRadius: 16
  },
  propsForDots: {
    r: "2",
    strokeWidth: "4",
    stroke: "#44B79D"
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    changeStep: (newstep) => {
      dispatch({ type: "change-step", newstep: newstep});
    },
  };
};

export default connect(null, mapDispatchToProps)(ChartsWeekScreen);
