import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Button, ScrollView } from "react-native";
import { connect } from "react-redux";

import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import { FontAwesome } from '@expo/vector-icons';

function ChartsYearScreen(props) {

  const [startDate, setStartDate] = useState('2020-05-20')
  const [dataDisplay, setDataDisplay] = useState([])

  useEffect(() => {
    // Récupère l'année de la date actuelle
    var yearDate = new Date(startDate);

    // Variable boolean qui va être True si l'année est bissextile
    var checkLeap = isLeapYear(yearDate.getFullYear())
    // initiateArray génère des tables avec des icones grises et prend pour un argument un true/false pour vérifier s'il s'agit d'une année bissextile
    
    var t0 = performance.now()
    initiateArray(checkLeap)

    // Récupère les données de la BDD + génère les tables pour l'affichage du calendrier
    var t1 = performance.now()
    console.log("initiateArray took" + (t1 - t0))
    fetchData()

  }, []);

  var headTable = [' ', 'j', 'f', 'm', 'a', 'm', 'j', 'j', 'a', 's', 'o', 'n', 'd'];

  // Initialise des tables vides pour chaque mois
  var jan = []
  var feb = []
  var mar = []
  var apr = []
  var may = []
  var jun = []
  var jul = []
  var aug = []
  var sep = []
  var oct = []
  var nov = []
  var dec = []

  /*  initiateArray : initialise des 12 Tables (une par mois) avec un cercle gris par jour 
      Prend en variable un Boolean qui est True si l'année en cours est bissextile*/
  const initiateArray = (bissextile) => {
    // Boucle for sur les 12 mois de l'année
    for (let i = 0; i < 12; i++) {
      /* 
        Condition sur l'index qui correspond au mois (l'index 0 correspond au mois de Janvier)
        Ajoute une icone FontAwesome pour chaque jour du mois   
        Enregistre le résultat dans les variables de mois correspondantes 
      */
      var emptyIcon = <FontAwesome name="circle" size={5} color="#F2F2F2" />
      // var emptyIcon = ''

      switch (i) {
        case 0:
          for (let j = 0; j < 31; j++) {
<<<<<<< HEAD
            jan.push(<FontAwesome name="circle" size={10} color="#F2F2F2" />)
=======
            jan.push(emptyIcon)
>>>>>>> 6a6ed907bd46bc1961ec663097a57717540b3521
          };
          break;
        case 1:
          // Vérifier si années bissextile (28j si oui, 29j sinon)
          var febDay = 29
          bissextile ? febDay = 28 : febDay = 29;
          for (let j = 0; j < febDay; j++) {
<<<<<<< HEAD
            feb.push(<FontAwesome name="circle" size={10} color="#F2F2F2" />)
=======
            feb.push(emptyIcon)
>>>>>>> 6a6ed907bd46bc1961ec663097a57717540b3521
          };
          break;
        case 2:
          for (let j = 0; j < 31; j++) {
<<<<<<< HEAD
            mar.push(<FontAwesome name="circle" size={10} color="#F2F2F2" />)
=======
            mar.push(emptyIcon)
>>>>>>> 6a6ed907bd46bc1961ec663097a57717540b3521
          };
          break;
        case 3:
          for (let j = 0; j < 30; j++) {
<<<<<<< HEAD
            apr.push(<FontAwesome name="circle" size={10} color="#F2F2F2" />)
=======
            apr.push(emptyIcon)
>>>>>>> 6a6ed907bd46bc1961ec663097a57717540b3521
          };
          break;
        case 4:
          for (let j = 0; j < 31; j++) {
<<<<<<< HEAD
            may.push(<FontAwesome name="circle" size={10} color="#F2F2F2" />)
=======
            may.push(emptyIcon)
>>>>>>> 6a6ed907bd46bc1961ec663097a57717540b3521
          };
          break;
        case 5:
          for (let j = 0; j < 30; j++) {
<<<<<<< HEAD
            jun.push(<FontAwesome name="circle" size={10} color="#F2F2F2" />)
=======
            jun.push(emptyIcon)
>>>>>>> 6a6ed907bd46bc1961ec663097a57717540b3521
          };
          break;
        case 6:
          for (let j = 0; j < 31; j++) {
<<<<<<< HEAD
            jul.push(<FontAwesome name="circle" size={10} color="#F2F2F2" />)
=======
            jul.push(emptyIcon)
>>>>>>> 6a6ed907bd46bc1961ec663097a57717540b3521
          };
          break;
        case 7:
          for (let j = 0; j < 31; j++) {
<<<<<<< HEAD
            aug.push(<FontAwesome name="circle" size={10} color="#F2F2F2" />)
=======
            aug.push(emptyIcon)
>>>>>>> 6a6ed907bd46bc1961ec663097a57717540b3521
          };
          break;
        case 8:
          for (let j = 0; j < 30; j++) {
<<<<<<< HEAD
            sep.push(<FontAwesome name="circle" size={10} color="#F2F2F2" />)
=======
            sep.push(emptyIcon)
>>>>>>> 6a6ed907bd46bc1961ec663097a57717540b3521
          };
          break;
        case 9:
          for (let j = 0; j < 31; j++) {
<<<<<<< HEAD
            oct.push(<FontAwesome name="circle" size={10} color="#F2F2F2" />)
=======
            oct.push(emptyIcon)
>>>>>>> 6a6ed907bd46bc1961ec663097a57717540b3521
          };
          break;
        case 10:
          for (let j = 0; j < 30; j++) {
<<<<<<< HEAD
            nov.push(<FontAwesome name="circle" size={10} color="#F2F2F2" />)
=======
            nov.push(emptyIcon)
>>>>>>> 6a6ed907bd46bc1961ec663097a57717540b3521
          };
          break;
        case 11:
          for (let j = 0; j < 31; j++) {
<<<<<<< HEAD
            dec.push(<FontAwesome name="circle" size={10} color="#F2F2F2" />)
=======
            dec.push(emptyIcon)
>>>>>>> 6a6ed907bd46bc1961ec663097a57717540b3521
          };
          break;
      }
  }}

  // Fonction qui vérifie si une année est bissextille
  function isLeapYear(year) {
    return year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0);
  }


  //Fonction qui récupère du résultat renvoyé par le backend et les exploite pour obtenir les bonnes données finales
  var fetchData = async () => {
<<<<<<< HEAD
    var rawData = await fetch("http://172.17.1.159:3000/history", {
=======
    var t2 = performance.now()

    var rawData = await fetch("http://172.17.1.144:3000/history", {
>>>>>>> 6a6ed907bd46bc1961ec663097a57717540b3521
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      },
      body: `startdate=${startDate}&type=year`
    });

    var data = await rawData.json();
    var dataHistory = data.history // Variable qui contient les données de l'historique

    var t3 = performance.now()

    console.log("fetch took" + (t3-t2))

    // Boucle sur l'historique pour remplacer les points gris par les points de couleurs (qui varient en fonction du mood_score)
    for (var i = 0; i < dataHistory.length; i++) {
      var convertDate = new Date(dataHistory[i].date) // Reconverti la date de l'historique 
      var month = parseInt(convertDate.getMonth()) // Récupère le mois
      var day = parseInt(convertDate.getDate()) // Récupère le jour
      var moodScore = parseInt(dataHistory[i].mood_score) // Récupère le mood score

      /* Condition sur le mois (getMonth initialise janvier à 0)
        Modifie la Table correspondante au mois et remplace le jour avec un Mood enregistré par une icone colorée
        moodScoreCircle retourne une icône fontAwesome avec une couleur différente en fonction du score
      */
      switch (month) {
        case 0:
          jan[day - 1] = moodScoreCircle(moodScore)
          break;
        case 1:
          feb[day - 1] = moodScoreCircle(moodScore)
          break;
        case 2:
          mar[day - 1] = moodScoreCircle(moodScore)
          break;
        case 3:
          apr[day - 1] = moodScoreCircle(moodScore)
          break;
        case 4:
          may[day - 1] = moodScoreCircle(moodScore)
          break;
        case 5:
          jun[day - 1] = moodScoreCircle(moodScore)
          break;
        case 6:
          jul[day - 1] = moodScoreCircle(moodScore)
          break;
        case 7:
          aug[day - 1] = moodScoreCircle(moodScore)
          break;
        case 8:
          sep[day - 1] = moodScoreCircle(moodScore)
          break;
        case 9:
          oct[day - 1] = moodScoreCircle(moodScore)
          break;
        case 10:
          nov[day - 1] = moodScoreCircle(moodScore)
          break;
        case 11:
          dec[day - 1] = moodScoreCircle(moodScore)
          break;
      }
    }
    
    // Modifie la variable d'état dataDisplay qui récupère tous les tableaux concernés 
    setDataDisplay([jan, feb, mar, apr, may, jun, jul, aug, sep, oct, nov, dec])
    var t4 = performance.now()
    console.log("change icon took" + (t4-t3))
  }

  // Fonction qui prend en variable le score et qui retourne un cercle avec la couleur associée à la note
  const moodScoreCircle = (score) => {
    switch (score) {
      case 1:
        return <FontAwesome color="#CD6133" name="circle" size={10} />
      case 2:
        return <FontAwesome color="#F0A07E" name="circle" size={10} />
      case 3:
        return <FontAwesome color="#F0D231" name="circle" size={10} />
      case 4:
        return <FontAwesome color="#44B79D" name="circle" size={10} />
      case 5:
        return <FontAwesome color="#fdf9f2" name="circle" size={10} />
    }
  }

  // dataTable qui contient les variables d'états pour chaque mois (1 mois = 1 colonne)
  var tableTitle = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'];

  return (
    <ScrollView>


      <Text style={styles.paragraph}>ChartsYearScreen</Text>

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

      <Table>
        <Row data={headTable} height={('auto')} style={styles.HeadStyle} textStyle={{ textAlign: 'center', justifyContent: 'flex-start' }} />
      </Table>


      <Table
      //  borderStyle={{borderWidth: 0.2, borderColor: '#44B79D'}}
      >


        <View style={{ flexDirection: 'row' }}>
          <TableWrapper style={{ flexDirection: 'row' }}>
            <Col data={tableTitle} width={20} height={14} textStyle={{ textAlign: 'center' }} />
          </TableWrapper>

          <TableWrapper style={{ flex: 1 }}>
            <Cols data={dataDisplay} style={{ flex: 1 }} height={14} textStyle={{ textAlign: 'center' }} />
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
  TableStyle: {
    flex: 1,
    margin: 6,
    height: 100,
  },
  DaylyTable: {
    margin: 1,
    alignContent: "center",
    textAlign: "center",
    justifyContent: 'flex-start',
    flexDirection: 'column',

  },
  singleHead: {
    width: 20, height: 20,
    backgroundColor: '#c8e1ff'
  },

});

const mapDispatchToProps = (dispatch) => {
  return {
    changeStep: (newstep) => {
      dispatch({ type: "change-step", newstep: newstep });
    },
  };
};

export default connect(null, mapDispatchToProps)(ChartsYearScreen);
