import React, {useEffect, useState} from "react";
import { StyleSheet, Text, View, Button, ScrollView} from "react-native";
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import { FontAwesome } from '@expo/vector-icons';


 
export default function ChartsYearScreen(props) {

  const [calendarChart, setCalendarChart] = useState([])
  const [startDate, setStartDate] = useState('2020-05-20')
const [janvier, setJanvier] = useState([])



//Récupération du résultat renvoyé par le backend

var fetchData = async() => {
  var rawDatas = await fetch("http://172.17.1.159:3000/history", {
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
  },
  body : `startdate=${startDate}&type=year`

});

var datas = await rawDatas.json();
var dataHistory = datas.history

console.log('score', dataHistory[0].mood_score)  

var setterCalendarChart = []
for (var i = 0 ; i < 365 ; i++) {
  if (dataHistory[i] === undefined || dataHistory[i].mood_score === undefined) 
  {
    setterCalendarChart.push(0)
    // dataHistory[i].mood_score = 0
  } else {
    setterCalendarChart.push(parseInt(dataHistory[i].mood_score))
}}


// Création
var janvier = [];
for (var i = 0 ; i < 31 ; i++) {
  janvier.push(setterCalendarChart[i])
}
setJanvier(janvier)

 }


 function Janvier() {
  for (var i = 0 ; i < janvier.length ; i++) {
   return (
<FontAwesome name="circle" size={13} color="black" />
   )}

 }
 console.log('janvier', janvier)



 // Condition de couleur du style du point
// for (var i = 0 ; i < janvier.length ; i++) {

// if (janvier[i] === 0 ) {
//   circleStyle.color = '#pink'
// } else {
//   likeStyle.color = '#ff0000'
// }

// }
    useEffect(() => {
    fetchData()
    }, []);

    // Définir l'année et connaitre le nombre de jour (année bissextile ou non)
    var today = new Date();
    var current_year = today.getFullYear()
  
    

    function days_of_a_year(year) 
    {      
      return isLeapYear(year) ? 366 : 365;
    }
        function isLeapYear(year) {
         return year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0);
    }
       
console.log(days_of_a_year(current_year))


var headTable = [' ','j', 'f', 'm', 'a', 'm', 'j', 'j', 'a', 's', 'o', 'n', 'd'] ;


// for (var day = 0 ; day < 5 ; day++) {
//   console.log(calendarChart[day])
// }

var circleTable = [];
for (var i = 0 ; i < janvier.length ; i++) {

  var color = "black" // "#fdf9f2"
  // if(){
  //   circleStyle.color = 
  // } else if () {
  //   circleStyle.color = 
  // }
  circleTable.push(<FontAwesome color={color} name="circle" size={13}/>)
}


var dataTable = [
    circleTable,
    ['c', 'd', 'e','a', 'b', 'c', 'd', 'e','a', 'b', 'c', 'd', 'e','a', 'b', 'c', 'd', 'e','a', 'b', 'c', 'd', 'e','a', 'b', 'c', 'd', 'e'],
    ['1', '2', '3', '4', '5','1', '2', '3', '4', '5','1', '2', '3', '4', '5','1', '2', '3', '4', '5','1', '2', '3', '4', '5','1', '2', '3', '4', '5'],
    ['b', 'c', 'd', 'e','a', 'b', 'c', 'd', 'e','a', 'b', 'c', 'd', 'e','a', 'b', 'c', 'd', 'e','a', 'b', 'c', 'd', 'e','a', 'b', 'c', 'd', 'e'],
    ['1', '2', '3', '4', '5','1', '2', '3', '4', '5','1', '2', '3', '4', '5','1', '2', '3', '4', '5','1', '2', '3', '4', '5','1', '2', '3', '4', '5'],
    ['2', '3', '4', '5','1', '2', '3', '4', '5','1', '2', '3', '4', '5','1', '2', '3', '4', '5','1', '2', '3', '4', '5','1', '2', '3', '4', '5'],
    ['a', 'b', 'c', 'd', 'e','a', 'b', 'c', 'd', 'e','a', 'b', 'c', 'd', 'e','a', 'b', 'c', 'd', 'e','a', 'b', 'c', 'd', 'e','a', 'b', 'c', 'd', 'e'],
    ['1', '2', '3', '4', '5','1', '2', '3', '4', '5','1', '2', '3', '4', '5','1', '2', '3', '4', '5','1', '2', '3', '4', '5','1', '2', '3', '4', '5'],
    ['a', 'b', 'c', 'd', 'e','a', 'b', 'c', 'd', 'e','a', 'b', 'c', 'd', 'e','a', 'b', 'c', 'd', 'e','a', 'b', 'c', 'd', 'e','a', 'b', 'c', 'd', 'e'],
    ['1', '2', '3', '4', '5','1', '2', '3', '4', '5','1', '2', '3', '4', '5','1', '2', '3', '4', '5','1', '2', '3', '4', '5','1', '2', '3', '4', '5'],
    ['a', 'b', 'c', 'd', 'e','a', 'b', 'c', 'd', 'e','a', 'b', 'c', 'd', 'e','a', 'b', 'c', 'd', 'e','a', 'b', 'c', 'd', 'e','a', 'b', 'c', 'd', 'e'],
    ['1', '2', '3', '4', '5','1', '2', '3', '4', '5','1', '2', '3', '4', '5','1', '2', '3', '4', '5','1', '2', '3', '4', '5','1', '2', '3', '4', '5'],
  ]
  var tableTitle = ['1', '2', '3', '4', '5','6', '7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31'];


 



  


  return (
    <ScrollView>
       

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




<Table>
        <Row data={headTable}  height={('auto')}  style={styles.HeadStyle} textStyle={{textAlign:'center', justifyContent:'flex-start'}}/>
      </Table>


    <Table
    //  borderStyle={{borderWidth: 0.2, borderColor: '#44B79D'}}
     >
   

<View style={{flexDirection: 'row'}}>
      <TableWrapper style={{flexDirection: 'row'}}>
        <Col data={tableTitle}  width={20} height={14} textStyle={{textAlign:'center'}}/> 
      </TableWrapper>

      <TableWrapper style={{flex: 1}}>
        <Cols data={dataTable} style= {{flex: 1}} height={14} textStyle={{textAlign:'center'}}/>
      </TableWrapper>
      </View>
    </Table>
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
  HeadStyle: { 
    height: 50,
    alignContent: "space-between",
    backgroundColor: '#ffffff'
  },
  TableText: { 
    margin: 1,
    alignContent: "center",
    textAlign: "center",
    color: '#44B79D'
  },
  TableStyle :{
flex : 1,
margin: 6,
height: 100,
  },
  DaylyTable: { 
    margin: 1,
    alignContent: "center",
    textAlign: "center",
    justifyContent : 'flex-start',
    flexDirection:'column',

  },
  singleHead: { 
    width: 20, height: 20, 
    backgroundColor: '#c8e1ff' },

});
