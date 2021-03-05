import React, {useState, useEffect} from "react";
import { StyleSheet, Text, ScrollView, View, Dimensions } from "react-native";
import {
  LineChart, // Bezier Line Chart / Variation Mood (courbe)
  PieChart, // répartition mood (demi donut)
} from "react-native-chart-kit";
import { connect } from "react-redux";
import SwitchSelector from "react-native-switch-selector";
import { Card, ListItem, Icon, Row } from 'react-native-elements'
import { FontAwesome5 } from "@expo/vector-icons";



function ChartsWeekScreen(props) { 

const [dataChart, setDataChart] = useState([0, 0, 0, 0, 0, 0, 0])
const [startDate, setStartDate] = useState('2020-05-20')
const [pieData, setPieData] = useState([])


/* Hook d'effet à l'ouverture de la page pour charger les données*/
useEffect(() => {
  fetchData()
}, []);

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
      setterdataChart.push(1)
    } else {
      setterdataChart.push(parseInt(dataHistory[i].mood_score))
  }}
  setDataChart(setterdataChart)

 // Traitement des données pour le Pie Chart
 pieDataGenerator(dataHistory)
}
  
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
  { name: 'angry', score: 1, count: score1, color: "#CD6133", legendFontColor: "#CD6133", legendFontSize: 15 },
  { name: 'sad-cry', score: 2, count: score2, color: "#F0A07E", legendFontColor: "#F0A07E", legendFontSize: 15 },
  { name: 'meh', score: 3, count: score3, color: "#F0D231", legendFontColor: "#F0D231", legendFontSize: 15 },
  { name: 'grin-squint', score: 4, count: score4, color: "#44B79D", legendFontColor: "#44B79D", legendFontSize: 15 },
  { name: 'smile-beam', score: 5, count: score5, color: "#54857F", legendFontColor: "#54857F", legendFontSize: 15 }]
);
 }


  return (
    <ScrollView >

        <SwitchSelector
          options= {[
            { label: "Semaine", value: 1},
            { label: "Mois", value: 2},
            { label: "Année", value: 3}]}
          textColor="#009788" //
          selectedColor="white"
          buttonColor="#009788"
          borderColor="#009788"
          hasPadding
          initial={0}
          style = {{width: 200, alignSelf: 'flex-end', marginTop: 40,marginRight:17 }}
          onPress={value => props.changeStep(value)}
        />

      
       
       <Card borderRadius={50}>
  <Card.Title style={{color:'#57706D'}}>Répartition globale des humeurs de la semaine</Card.Title>
  <Card.Divider/>
  <View style={{ flexDirection: "row", paddingBottom:0,
      marginBottom:0, flex:1 }}>
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
        // absolute
        hasLegend={false}  
        alignItems={'center'}


      />
      <View style={{marginTop: 32 ,marginLeft: -130, width: 100}} >

<Text style={{marginBottom:8}}><FontAwesome5 name='angry' size={25} color="#CD6133" /></Text>
<Text style={{marginBottom:8}}><FontAwesome5 name='sad-cry' size={25} color="#F0A07E" /></Text>
<Text style={{marginBottom:8}}><FontAwesome5 name='meh' size={25} color="#F0D231" /></Text>
<Text style={{marginBottom:8}}><FontAwesome5 name='grin-squint' size={25} color="#44B79D" /></Text>
<Text style={{marginBottom:8}}><FontAwesome5 name='smile-beam' size={25} color="#54857F" /></Text>

{/* <Text style={{marginBottom:8}}><FontAwesome5 name={pieData[0].name} size={25} color={pieData[0].color} /></Text>
<Text style={{marginBottom:8}}><FontAwesome5 name={pieData[1].name} size={25} color={pieData[0].color} /></Text> */}
{/* <Text style={{marginBottom:8}}><FontAwesome5 name={pieData[2].name} size={25} color={pieData[2].color} /></Text>
<Text style={{marginBottom:8}}><FontAwesome5 name={pieData[3].name} size={25} color={pieData[3].color} /></Text>
<Text style={{marginBottom:8}}><FontAwesome5 name={pieData[4].name} size={25} color={pieData[4].color} /></Text> */} 
       </View>
</View>
      </Card>
       
      <Card borderRadius={50} flex={0} >

<Card.Title style={{color:'#57706D'}}>Répartition quotidienne des humeurs</Card.Title>
<Card.Divider/>
      <LineChart
        data={{
        labels: ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"],
        datasets: [
          {
            data: dataChart
          }
        ]
        }}
          width={Dimensions.get("window").width - 50} 
          height={220}
            // yAxisLabel="$"
            // yAxisSuffix="k"
          yAxisInterval={7} // optional, defaults to 1
          chartConfig={chartConfig}
          bezier
          style={{
            borderRadius: 16,
          paddingRight: 25,
          paddingLeft: 0,
          paddingTop: 10,
          
       }}
            
            />

          </Card>
    </ScrollView>
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
  backgroundGradientFrom: "#F0D231",
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: "#F0D231",
  backgroundGradientToOpacity: 0,

  decimalPlaces: 0, // optional
  color: (opacity = 1) => `rgba(68, 183, 157, ${opacity})`,
  labelColor: (opacity = 1) => `#57706D`,
  style: {
    borderRadius: 16
  },
  propsForDots: {
    r: "2.5",
    strokeWidth: "5",
    stroke: "#F0A07E"
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
