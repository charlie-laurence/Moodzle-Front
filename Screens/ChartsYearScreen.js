import React, {useEffect} from "react";
import { StyleSheet, Text, View, Button, ScrollView} from "react-native";

import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';


export default function ChartsYearScreen(props) {


{/* <ion-icon name="ellipse"></ion-icon> 
ou
<i class="fas fa-circle"></i>
*/}


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
 }
  
    useEffect(() => {
    fetchData()
    }, []);

  
    // Définir l'année et connaitre le nombre de jour (année bissextile ou non)
    var today = new Date();
    var current_year = today.getFullYear()
    console.log(current_year)
    

    function days_of_a_year(year) 
    {      
      return isLeapYear(year) ? 366 : 365;
    }
        function isLeapYear(year) {
         return year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0);
    }
       
console.log(days_of_a_year(current_year))


var headTable = [' ','j', 'f', 'm', 'a', 'm', 'j', 'j', 'a', 's', 'o', 'n', 'd'] ;


var dataTable = [
    ['6', '1', '2', '3', '4', '5','1', '2', '3', '4', '5','1', '2', '3', '4', '5','1', '2', '3', '4', '5','1', '2', '3', '4', '5','1', '2', '3', '4', '5'],
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
<ScrollView>

 
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
