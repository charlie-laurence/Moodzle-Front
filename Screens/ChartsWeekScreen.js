import React, {useState} from "react";
import { StyleSheet, Text, View, Button, Dimensions } from "react-native";
import {
  LineChart, // Bezier Line Chart / Variation Mood (courbe)
  PieChart, // répartition mood (demi donut)
} from "react-native-chart-kit";
import { FontAwesome5, FontAwesomeIcon } from "@expo/vector-icons";


    


export default function ChartsWeekScreen(props) {

const [dataWeek, setDataWeek] = useState([])

  var score1 = 1;
  var score2 = 2;
  var score3 = 3;
  var score4 = 4;
  var score5 = 5;

 

  var fetchData = async() => {
    //Récupération du résultat renvoyé par le backend
    var rawDatas = await fetch("http://172.17.1.159:3000/history", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      }
    });
    
    datas = await rawDatas.json();
    setDataWeek(datas)
    console.log('datas',datas.history[1].mood_score)
    }
    console.log('datas1',dataWeek.history)

    fetchData()

    const moodData = [
      {
        icon: "angry",
        color: "#CD6133",
      },
      {
        icon: "sad-cry",
        color: "#F0A07E",
      },
      {
        icon: "meh",
        color: "#F0D231",
      },
      {
        icon: "grin-squint",
        color: "#44B79D",
      },
      {
        icon: "smile-beam",
        color: "#54857F",
      },
    ];

function BezierChart() {return (<LineChart
data={{
  labels: ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"],
  datasets: [
    {
      data: [
        1,2,3,4,5
       
      ]
    }
  ]
}}
width={Dimensions.get("window").width} 
height={220}
// yAxisLabel="$"
// yAxisSuffix="k"
// yAxisInterval={1} // optional, defaults to 1

chartConfig={{
  backgroundGradientFrom: "#1E2923",
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: "#08130D",
  backgroundGradientToOpacity: 0.5,

  decimalPlaces: 0, // optional
  color: (opacity = 0) => `rgba(255, 255, 255, ${opacity})`,
  labelColor: (opacity = 1) => `#44B79D`,
  style: {
    borderRadius: 16
  },
  propsForDots: {
    r: "3",
    strokeWidth: "2",
    stroke: "#44B79D"
  }
}}
bezier
style={{
  marginVertical: 8,
  borderRadius: 16
}}
/>) }


// Bezier Line Chart
//   <LineChart
//    data={data}
//    width={screenWidth}
//    height={256}
//    verticalLabelRotation={30}
//    chartConfig={chartConfig}
// bezier
// />


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
