import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";


import {
    PieChart
  } from "react-native-chart-kit";
  
export default function Pie(props) {

    var fetchData = async () => {
        var dataRaw = await fetch('http://172.17.1.144:3000/history', {
            method: 'POST',
            headers: {'Content-Type':'application/x-www-form-urlencoded'},
        });
    
        var data = await dataRaw.json()
        console.log(data)
        return data
    }

    fetchData()
    
    return(
        <View>AAAA</View>
    )
}