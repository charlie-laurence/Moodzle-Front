import React, {useState, useEffect} from "react";
import { StyleSheet, Text, View, Button, Dimensions } from "react-native";
import {PieChart, LineChart} from "react-native-chart-kit";


export default function ChartsMonthScreen(props) {

  const [pieData, setPieData] = useState([])
  const [startDate, setStartDate] = useState('2020-05-20')
  const [lineLabel, setLineLabel] = useState([''])
  const [lineData, setLineData] = useState([0])

  /* Hook d'effet à l'ouverture de la page pour charger les données*/
  useEffect(() => {
    fetchData()
  }, [])

  // Fonction qui récupère les données du back + traite les données pour l'affichage sur les graphes
  var fetchData = async () => {
    var dataRaw = await fetch('http://172.17.1.144:3000/history', {
        method: 'POST',
        headers: {'Content-Type':'application/x-www-form-urlencoded'},
        body: `startdate=${startDate}&type=month`
    });

    var data = await dataRaw.json()
    var dataHistory = data.history

    // Traitement des données pour le Pie Chart
    pieDataGenerator(dataHistory)
    lineGenerator(dataHistory)
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
      {score: 1, count: score1, color:"#CD6133", legendFontColor: "#CD6133", legendFontSize: 15}, 
      {score: 2, count: score2, color:"#F0A07E", legendFontColor: "#F0A07E", legendFontSize: 15}, 
      {score: 3, count: score3, color:"#F0D231", legendFontColor: "#F0D231", legendFontSize: 15}, 
      {score: 4, count: score4, color:"#44B79D", legendFontColor: "#44B79D", legendFontSize: 15}, 
      {score: 5, count: score5, color:"#54857F", legendFontColor: "#54857F", legendFontSize: 15}]
      );
  }

  /* Fonction qui récupère les données pour la courbe */
  var lineGenerator = (dataset) => {
    let lineLabelsArray = []
    let lineDataArray = []

    for (let i = 0; i < dataset.length; i++) {
      lineLabelsArray.push(i + 1)
      lineDataArray.push(parseInt(dataset[i].mood_score))
    }
    setLineLabel(lineLabelsArray)
    setLineData(lineDataArray)
  }



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

      <LineChart
        data={{
          labels: lineLabel,
          datasets: [{data: lineData}]
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

  // Variable pour configurer le Pie Chart
  // const pieChartConfig = {
  //   backgroundGradientFrom: "#1E2923",
  //   backgroundGradientFromOpacity: 0,
  //   backgroundGradientTo: "#08130D",
  //   backgroundGradientToOpacity: 0,
  //   strokeWidth: 2,
  //   color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  //   labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  //   barPercentage: 0.5,
  // };
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
  