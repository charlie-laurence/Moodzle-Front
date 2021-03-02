import React, {useEffect} from "react";
import { StyleSheet, Text, View, Button, Dimensions } from "react-native";
// Calendrier
import {ContributionGraph} from "react-native-chart-kit";


// Contribution graph (heatmap)

export default function ChartsYearScreen(props) {


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


// for (var i = 0 ; i < 7 ; i++) {

//   if (dataHistory[i]==undefined ) {
//     setterdataChart.push(0)

//     // dataHistory[i].mood_score = 0
//   } else {

//     setterdataChart.push(dataHistory[i].mood_score)

// }
// console.log('i', setterdataChart)
// setDataChart([...setterdataChart])

// }


  }
  
    useEffect(() => {
    fetchData()
    }, []);

    const commitsData = [
      { date: "2017-01-02", count: 1 },
      { date: "2017-01-03", count: 2 },
      { date: "2017-01-04", count: 3 },
      { date: "2017-01-05", count: 4 },
      { date: "2017-01-06", count: 5 },
      { date: "2017-01-30", count: 2 },
      { date: "2017-01-31", count: 3 },
      { date: "2017-03-01", count: 2 },
      { date: "2017-04-02", count: 4 },
      { date: "2017-03-05", count: 2 },
      { date: "2017-02-30", count: 4 }
    ];
   

    function days_of_a_year(year) 
    {      
      return isLeapYear(year) ? 366 : 365;
    }
    
    function isLeapYear(year) {
         return year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0);
    }
    
    console.log(days_of_a_year(2015));
    console.log(days_of_a_year(2016));





  return (
    <View>
        
      <Text style={styles.paragraph}>ChartsYearScreen</Text>
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


<ContributionGraph
      values={commitsData}
      endDate={new Date("2020-04-01")}
      numDays={100}
      width={Dimensions.get("window").width} 
      height={220}
      chartConfig={chartConfig}
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

const chartConfig = {
  showMonthLabels : true
  }
