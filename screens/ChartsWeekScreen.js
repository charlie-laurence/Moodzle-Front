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
const [startDate, setStartDate] = useState('2020-05-20')
const [pieData, setPieData] = useState([])


//Récupération du résultat renvoyé par le backend

var fetchData = async() => {
  var rawDatas = await fetch("http://172.17.1.159:3000/history", {
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
  },
  body : `startdate=${startDate}&type=week`
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


 // Traitement des données pour le Pie Chart
 pieDataGenerator(dataHistory)
//  lineGenerator(dataHistory)

}
  
useEffect(() => {
  fetchData()
}, []);


  
/* Fonction qui calcule le nombre d'occurence pour chaque score de mood */
var pieDataGenerator = (dataset) => {
 // Initialisation des scores à 0
 let score1 = 0
 let score2 = 0
 let score3 = 0
 let score4 = 0
 let score5 = 0

 // Incrémenter les scores de 1 à chaque fois qu'une note des données correspondent 
 for (let i = 0; i < dataset.length; i ++) {
   switch (dataset[i].mood_score) {
     case 1: 
       score1 += 1;
       break;
     case 2: 
       score2 += 1;
       break;
     case 3: 
       score3 += 1;
       break;
     case 4: 
       score4 += 1;
       break;
     case 5: 
       score5 += 1;
       break;
   }
 }

 // Stocker les résultats dans un états qui seront exploiter par le PieChart
 setPieData([
   {name: 'angry',score: 1, count: score1, color:"#CD6133", legendFontColor: "#CD6133", legendFontSize: 15}, 
   {name: 'sad', score: 2, count: score2, color:"#F0A07E", legendFontColor: "#F0A07E", legendFontSize: 15}, 
   {name: 'meh', score: 3, count: score3, color:"#F0D231", legendFontColor: "#F0D231", legendFontSize: 15}, 
   {name: 'happy', score: 4, count: score4, color:"#44B79D", legendFontColor: "#44B79D", legendFontSize: 15}, 
   {name: 'super', score: 5, count: score5, color:"#54857F", legendFontColor: "#54857F", legendFontSize: 15}]
   );
 }



function PieChart() {
  return (
    <PieChart
        data={pieData}
        width={Dimensions.get("window").width}
        height={220}
        chartConfig={{
          backgroundGradientFrom: "#1E2923",
          backgroundGradientFromOpacity: 0,
          backgroundGradientTo: "#08130D",
          backgroundGradientToOpacity: 0,
          strokeWidth: 2,
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          barPercentage: 0.5,
        }}
        accessor={"count"}
        backgroundColor={"transparent"}
        center={[10, 0]}
        absolute
        hasLegend={true}  
      />
  )
}




   
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
    yAxisInterval={7} // optional, defaults to 1
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
      {/* <PieChart /> */}
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
