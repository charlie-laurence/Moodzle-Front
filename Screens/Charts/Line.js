import React from 'react'
import {View} from 'react-native'
import {LineChart} from "react-native-chart-kit"; // Bezier Line Chart // Variation Mood
  
var fetchData = async() => {
//Récupération du résultat renvoyé par le backend
var rawDatas = await fetch("http://172.17.1.159:3000/history", {
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
  }
});

var datas = await rawDatas.json();
console.log('datas',datas)

}
  

export default function Line(props) {
    return (
<View>Coucou</View>

    )}
