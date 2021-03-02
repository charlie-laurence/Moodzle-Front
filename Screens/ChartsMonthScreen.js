import React, {useState, useEffect} from "react";
import { StyleSheet, Text, View, Button, Dimensions } from "react-native";
import {PieChart} from "react-native-chart-kit";


export default function ChartsMonthScreen(props) {

  const [pieData, setPieData] = useState([])

  const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0,
    strokeWidth: 2,
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    barPercentage: 0.5,
  };
  
 var fetchData = async () => {
    var dataRaw = await fetch('http://172.17.1.159:3000/history', {
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






// // Calendrier
// import {Calendar, CalendarList, Agenda, LocaleConfig} from 'react-native-calendars';


// LocaleConfig.locales['fr'] = {
//   monthNames: ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'],
//   monthNamesShort: ['Janv.','Févr.','Mars','Avril','Mai','Juin','Juil.','Août','Sept.','Oct.','Nov.','Déc.'],
//   dayNames: ['Dimanche','Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi'],
//   dayNamesShort: ['Dim.','Lun.','Mar.','Mer.','Jeu.','Ven.','Sam.'],
//   today: 'Aujourd\'hui'
// };
// LocaleConfig.defaultLocale = 'fr';

// <CalendarList
//   // Initially visible month. Default = Date()
//   current={'2012-03-01'}
//   // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
//   minDate={'2012-05-10'}
//   // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
//   maxDate={'2012-05-30'}
//   // Handler which gets executed on day press. Default = undefined
//   onDayPress={(day) => {console.log('selected day', day)}}
//   // Handler which gets executed on day long press. Default = undefined
//   onDayLongPress={(day) => {console.log('selected day', day)}}
//   // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
//   monthFormat={'yyyy MM'}
//   // Handler which gets executed when visible month changes in calendar. Default = undefined
//   onMonthChange={(month) => {console.log('month changed', month)}}
//   // Hide month navigation arrows. Default = false
//   hideArrows={true}
//   // Replace default arrows with custom ones (direction can be 'left' or 'right')
//   renderArrow={(direction) => (<Arrow/>)}
//   // Do not show days of other months in month page. Default = false
//   hideExtraDays={true}
//   // If hideArrows=false and hideExtraDays=false do not switch month when tapping on greyed out
//   // day from another month that is visible in calendar page. Default = false
//   disableMonthChange={true}
//   // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday.
//   firstDay={1}
//   // Hide day names. Default = false
//   hideDayNames={true}
//   // Show week numbers to the left. Default = false
//   showWeekNumbers={true}
//   // Handler which gets executed when press arrow icon left. It receive a callback can go back month
//   onPressArrowLeft={subtractMonth => subtractMonth()}
//   // Handler which gets executed when press arrow icon right. It receive a callback can go next month
//   onPressArrowRight={addMonth => addMonth()}
//   // Disable left arrow. Default = false
//   disableArrowLeft={true}
//   // Disable right arrow. Default = false
//   disableArrowRight={true}
//   // Disable all touch events for disabled days. can be override with disableTouchEvent in markedDates
//   disableAllTouchEventsForDisabledDays={true}
//   // Replace default month and year title with custom one. the function receive a date as parameter.
//   renderHeader={(date) => {/*Return JSX*/}}
//   // Enable the option to swipe between months. Default = false
//   enableSwipeMonths={true}

//    // Collection of dates that have to be colored in a special way. Default = {}
//    markedDates={{
//     '2012-05-20': {textColor: 'green'},
//     '2012-05-22': {startingDay: true, color: 'green'},
//     '2012-05-23': {selected: true, endingDay: true, color: 'green', textColor: 'gray'},
//     '2012-05-04': {disabled: true, startingDay: true, color: 'green', endingDay: true}
//   }}
//     // Date marking style [simple/period/multi-dot/custom]. Default = 'simple'

//   markingType={'period'}
   
// />
