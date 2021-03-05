import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button, Dimensions, ScrollView, Image, FlatList } from "react-native";
import { PieChart, LineChart } from "react-native-chart-kit";
import { connect } from "react-redux";
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { Card, ListItem, Icon, Row } from 'react-native-elements'
import SwitchSelector from "react-native-switch-selector";
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome5 } from "@expo/vector-icons";


function ChartsMonthScreen(props) {

  const [pieData, setPieData] = useState([])
  const [startDate, setStartDate] = useState('2020-05-20')
  const [lineLabel, setLineLabel] = useState([''])
  const [lineData, setLineData] = useState([0])
  const [firstDay, setFirstDay] = useState()
  const [lastDay, setLastDay] = useState()
  const [calendarData, setCalendarData] = useState({})
  const [topActivities, setTopActivities] = useState(['', '', ''])


  /* Hook d'effet à l'ouverture de la page pour charger les données*/
  useEffect(() => {
    fetchData()

    // Enregistrer les dates de départ et de fin pour le Calendrier
  }, [])

  // Fonction qui récupère les données du back + traite les données pour l'affichage sur les graphes
  var fetchData = async () => {
    var dataRaw = await fetch('http://172.17.1.144:3000/history', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `startdate=${startDate}&type=month`
    });

    var data = await dataRaw.json()
    var dataHistory = data.history


    // Top activités

    // Récupération du tableau d'activités
    var allMonthActivities = []
    var eachMonthActivity = []

    for (var i = 0; i < dataHistory.length; i++) {
      allMonthActivities.push(dataHistory[i].activity)
    }

    // Aller récupérer les activités de chaque jour (certains ayant plusieurs activités)
    for (var j = 0; j < allMonthActivities.length; j++) {
      for (var i = 0; i < allMonthActivities[j].length; i++) {
        eachMonthActivity.push(allMonthActivities[j][i].name)
      }
    }

    // Traitement pour compter le nombre d'occurences de chaque activité
    var map = eachMonthActivity.reduce(function (p, c) {
      p[c] = (p[c] || 0) + 1;
      return p;
    }, {});

    // Trier les activités par ordre décroissant d'occurence
    var topSortActivities = Object.keys(map).sort(function (a, b) {
      return map[b] - map[a];
    });

    setTopActivities([topSortActivities[0], topSortActivities[1], topSortActivities[2]])

    // Traitement des données pour le Pie Chart
    pieDataGenerator(dataHistory)
    lineGenerator(dataHistory)

    // Traitement des données pour le Calendrier
    var startDateFormat = new Date(startDate)
    var firstSetDay = new Date(startDateFormat.getFullYear(), startDateFormat.getMonth(), 1);
    var lastSetDay = new Date(startDateFormat.getFullYear(), startDateFormat.getMonth() + 1, 0);
    setFirstDay(firstSetDay)
    setLastDay(lastSetDay)

    var markedSetDate = {}

    for (let i = 0; i < dataHistory.length; i++) {
      var markColor = ''
      var dateConvertToString = new Date(dataHistory[i].date).toISOString().substring(0, 10)
      switch (dataHistory[i].mood_score) {
        case 1:
          markColor = "#CD6133";
          break;
        case 2:
          markColor = "#F0A07E";
          break;
        case 3:
          markColor = "#F0D231";
          break;
        case 4:
          markColor = "#44B79D";
          break;
        case 5:
          markColor = "#54857F";
          break;
      }
      markedSetDate[dateConvertToString] = { selected: true, selectedColor: markColor }
    }
    // console.log(markedSetDate)
    setCalendarData(markedSetDate)

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
    for (let i = 0; i < dataset.length; i++) {
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


  /* Fonction qui récupère les données pour la courbe */
  var lineGenerator = (dataset) => {
    let lineLabelsArray = []
    let lineDataArray = []

    for (let i = 1; i < dataset.length; i++) {
      (i % 5) === 0 ? lineLabelsArray.push(`${i}`) : lineLabelsArray.push('') //Modulo 5 pour avoir des labels tous les 5 jours

      lineDataArray.push(parseInt(dataset[i].mood_score))
    }
    setLineLabel(lineLabelsArray)
    setLineData(lineDataArray)
  }

  // Calendrier
  LocaleConfig.locales['fr'] = {
    monthNames: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
    monthNamesShort: ['Janv.', 'Févr.', 'Mars', 'Avril', 'Mai', 'Juin', 'Juil.', 'Août', 'Sept.', 'Oct.', 'Nov.', 'Déc.'],
    dayNames: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
    dayNamesShort: ['Dim.', 'Lun.', 'Mar.', 'Mer.', 'Jeu.', 'Ven.', 'Sam.'],
    today: 'Aujourd\'hui'
  };
  LocaleConfig.defaultLocale = 'fr';

  return (
    <ScrollView paddingBottom={100}>


      <SwitchSelector
        options={[
          { label: "Semaine", value: 1 },
          { label: "Mois", value: 2 },
          { label: "Année", value: 3 }]}
        textColor="#009788" //
        selectedColor="white"
        buttonColor="#009788"
        borderColor="#009788"
        hasPadding
        initial={1}
        style={{ width: 200, alignSelf: 'flex-end', marginTop: 40, marginRight: 17 }}
        onPress={value => props.changeStep(value)}
      />

      <Card borderRadius={50} containerStyle={{ height: 300 }} >
        <Card.Title style={{ color: '#57706D' }}>Top des activités du mois</Card.Title>
        <Card.Divider />

        <View style={{
          flexDirection: "row", paddingBottom: 0,
          marginBottom: 0, flex: 1
        }}>
          <Image
            source={require('../assets/podium_moodzle_moodz.png')} style={{
              width: 220,
              height: 220,
              resizeMode: 'stretch',
              paddingRight: 0,
              marginLeft: 20,
              marginTop: 0,
              paddingTop: 0
            }}
          />

          <View style={{ marginLeft: -50, width: 100, marginTop: 10 }} >
            <Text style={{ color: '#57706D' }}><FontAwesome name="circle" size={10} color="#5B63AE" iconStyle={{ marginRight: 10 }} />{` ${topActivities[0]}`}</Text>
            <Text style={{ color: '#57706D' }}><FontAwesome name="circle" size={10} color="#44B79D" style={{ alignSelf: 'center', marginRight: 50 }} />{` ${topActivities[1]}`}</Text>
            <Text style={{ color: '#57706D' }}><FontAwesome name="circle" size={10} color="#df8f4a" style={{ alignSelf: 'center', marginRight: 50 }} />{` ${topActivities[2]}`}</Text>
          </View>
          {/* <Card.Image
        source={require('../assets/moodz.png')} style={{width: '50%',
          height: '35%',
          resizeMode: 'stretch',
        paddingBottom:0,
      marginBottom:0}}
      /> */}
        </View>
      </Card>


      <Card borderRadius={50} style={{ marginBottom: 10 }}>
        <Card.Title style={{ color: '#57706D' }}>Calendrier des humeurs</Card.Title>
        <Card.Divider />

        <Calendar
          style={{
            height: 200,
            marginBottom: 80,
            marginTop: 0,
            paddingTop: 0
          }}
          theme={{
            calendarBackground: '#11ffee00'
          }}
          // Initially visible month. Default = Date()
          current={startDate}
          // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
          minDate={firstDay}
          // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
          maxDate={lastDay}
          // Handler which gets executed on day press. Default = undefined
          onDayPress={(day) => { console.log('selected day', day) }}
          // Handler which gets executed on day long press. Default = undefined
          onDayLongPress={(day) => { console.log('selected day', day) }}
          // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
          monthFormat={'yyyy MM'}
          // Handler which gets executed when visible month changes in calendar. Default = undefined
          onMonthChange={(month) => { console.log('month changed', month) }}
          // Hide month navigation arrows. Default = false
          hideArrows={true}
          // Replace default arrows with custom ones (direction can be 'left' or 'right')
          renderArrow={(direction) => (<Arrow />)}
          // Do not show days of other months in month page. Default = false
          hideExtraDays={true}
          // If hideArrows=false and hideExtraDays=false do not switch month when tapping on greyed out
          // day from another month that is visible in calendar page. Default = false
          disableMonthChange={true}
          // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday.
          firstDay={1}
          // Hide day names. Default = false
          hideDayNames={true}
          // Show week numbers to the left. Default = false
          showWeekNumbers={true}
          // Handler which gets executed when press arrow icon left. It receive a callback can go back month
          onPressArrowLeft={subtractMonth => subtractMonth()}
          // Handler which gets executed when press arrow icon right. It receive a callback can go next month
          onPressArrowRight={addMonth => addMonth()}
          // Disable left arrow. Default = false
          disableArrowLeft={true}
          // Disable right arrow. Default = false
          disableArrowRight={true}
          // Disable all touch events for disabled days. can be override with disableTouchEvent in markedDates
          disableAllTouchEventsForDisabledDays={true}
          // Replace default month and year title with custom one. the function receive a date as parameter.
          renderHeader={(date) => {/*Return JSX*/ }}
          // Enable the option to swipe between months. Default = false
          markedDates={calendarData}
        />
      </Card>



      <Card borderRadius={50}>
        <Card.Title style={{ color: '#57706D' }}>Répartition globale des humeurs du mois</Card.Title>
        <Card.Divider />
        <View style={{
          flexDirection: "row", paddingBottom: 0,
          marginBottom: 0, flex: 1
        }}>
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
            hasLegend={false}
            alignItems={'center'}

          />
          <View style={{ marginTop: 32, marginLeft: -130, width: 100 }} >

            <Text style={{ marginBottom: 8 }}><FontAwesome5 name='angry' size={25} color="#CD6133" /></Text>
            <Text style={{ marginBottom: 8 }}><FontAwesome5 name='sad-cry' size={25} color="#F0A07E" /></Text>
            <Text style={{ marginBottom: 8 }}><FontAwesome5 name='meh' size={25} color="#F0D231" /></Text>
            <Text style={{ marginBottom: 8 }}><FontAwesome5 name='grin-squint' size={25} color="#44B79D" /></Text>
            <Text style={{ marginBottom: 8 }}><FontAwesome5 name='smile-beam' size={25} color="#54857F" /></Text>
          </View>
        </View>
      </Card>

      <Card borderRadius={50} >

        <Card.Title style={{ color: '#57706D' }}>Répartition quotidienne des humeurs</Card.Title>
        <Card.Divider />
        <LineChart

          data={{
            labels: lineLabel,
            datasets: [{ data: lineData }]
          }}
          width={Dimensions.get("window").width - 50}
          height={220}
          // yAxisLabel="$"
          // yAxisSuffix="k"
          yAxisInterval={31} // optional, defaults to 1
          chartConfig={chartConfig}
          bezier
          style={{
            borderRadius: 16,
            paddingRight: 25,
            paddingLeft: 0,
            paddingTop: 10
          }}
        />

      </Card>

    </ScrollView >
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
    r: "1",
    strokeWidth: "3",
    stroke: "#F0A07E"
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    changeStep: (newstep) => {
      dispatch({ type: "change-step", newstep: newstep });
    },
  };
};

export default connect(null, mapDispatchToProps)(ChartsMonthScreen);
