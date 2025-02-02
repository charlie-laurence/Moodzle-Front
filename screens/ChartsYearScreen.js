import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Dimensions } from "react-native";
import { Card } from "react-native-elements";
import SwitchSelector from "react-native-switch-selector";
import { Table, TableWrapper, Col, Cols } from "react-native-table-component";
import { FontAwesome } from "@expo/vector-icons";
import { proxy } from "../statics/ip";


function ChartsYearScreen(props) {
  const [startDate, setStartDate] = useState(
    new Date().toISOString().substring(0, 10)
  );
  const [dataDisplay, setDataDisplay] = useState([]);
  const [yearDisplay, setYearDisplay] = useState(new Date().getFullYear());

  useEffect(() => {
    // Récupère l'année de la date actuelle
    var yearDate = new Date(startDate);

    // Variable boolean qui va être True si l'année est bissextile
    var checkLeap = isLeapYear(yearDate.getFullYear());
    // initiateArray génère des tables avec des icones grises et prend pour un argument un true/false pour vérifier s'il s'agit d'une année bissextile
    initiateArray(checkLeap);

    // Récupère les données de la BDD + génère les tables pour l'affichage du calendrier
    fetchData();
  }, [startDate]);

  var yearSelect = (type) => {
    var year = yearDisplay;
    var todayYear = new Date().getFullYear();

    if (type === "prev") {
      var addYear = -1;
    } else if (type === "next" && year < todayYear) {
      var addYear = 1;
    } else if (type === "next" && year >= todayYear) {
      return;
    }

    var startDateCopy = new Date(startDate);
    var filterDate = new Date(startDateCopy.getFullYear() + addYear, 0, 1, 1);
    var dateConvert = filterDate.toISOString().substring(0, 10);
    setStartDate(dateConvert);
    setYearDisplay(filterDate.getFullYear());
  };

  // Initialise des tables pour chaque mois avec l'entête en élément à l'index 0
  var jan = ["J"];
  var feb = ["F"];
  var mar = ["M"];
  var apr = ["A"];
  var may = ["M"];
  var jun = ["J"];
  var jul = ["J"];
  var aug = ["A"];
  var sep = ["S"];
  var oct = ["O"];
  var nov = ["N"];
  var dec = ["D"];

  /*initiateArray : initialise des 12 Tables (une par mois) avec un cercle gris par jour 
      Prend en variable un Boolean qui est True si l'année en cours est bissextile*/
  const initiateArray = (bissextile) => {
    // Boucle for sur les 12 mois de l'année
    for (let i = 0; i < 12; i++) {
      /* 
        Condition sur l'index qui correspond au mois (l'index 0 correspond au mois de Janvier)
        Ajoute une icone FontAwesome pour chaque jour du mois   
        Enregistre le résultat dans les variables de mois correspondantes 
      */
      var emptyIcon = (
        <FontAwesome
          name="circle"
          size={13}
          color="#F2F2F2"
          style={{ alignSelf: "center" }}
        />
      );

      switch (i) {
        case 0:
          for (let j = 0; j < 31; j++) {
            jan.push(emptyIcon);
          }
          break;
        case 1:
          // Vérifier si années bissextile (29j si oui, 28j sinon)
          var febDay = 29;
          bissextile ? (febDay = 29) : (febDay = 28);
          for (let j = 0; j < febDay; j++) {
            feb.push(emptyIcon);
          }
          break;
        case 2:
          for (let j = 0; j < 31; j++) {
            mar.push(emptyIcon);
          }
          break;
        case 3:
          for (let j = 0; j < 30; j++) {
            apr.push(emptyIcon);
          }
          break;
        case 4:
          for (let j = 0; j < 31; j++) {
            may.push(emptyIcon);
          }
          break;
        case 5:
          for (let j = 0; j < 30; j++) {
            jun.push(emptyIcon);
          }
          break;
        case 6:
          for (let j = 0; j < 31; j++) {
            jul.push(emptyIcon);
          }
          break;
        case 7:
          for (let j = 0; j < 31; j++) {
            aug.push(emptyIcon);
          }
          break;
        case 8:
          for (let j = 0; j < 30; j++) {
            sep.push(emptyIcon);
          }
          break;
        case 9:
          for (let j = 0; j < 31; j++) {
            oct.push(emptyIcon);
          }
          break;
        case 10:
          for (let j = 0; j < 30; j++) {
            nov.push(emptyIcon);
          }
          break;
        case 11:
          for (let j = 0; j < 31; j++) {
            dec.push(emptyIcon);
          }
          break;
      }
    }
  };

  // Fonction qui vérifie si une année est bissextille
  function isLeapYear(year) {
    return year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0);
  }

  //Fonction qui récupère du résultat renvoyé par le backend et les exploite pour obtenir les bonnes données finales
  var fetchData = async () => {
    var rawData = await fetch(`${proxy}/history`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      },
      body: `startdate=${startDate}&type=year&token=${props.token}`,
    });

    var data = await rawData.json();
    var dataHistory = data.history; // Variable qui contient les données de l'historique

    // Boucle sur l'historique pour remplacer les points gris par les points de couleurs (qui varient en fonction du mood_score)
    for (var i = 0; i < dataHistory.length; i++) {
      var convertDate = new Date(dataHistory[i].date); // Reconverti la date de l'historique
      var month = parseInt(convertDate.getMonth()); // Récupère le mois
      var day = parseInt(convertDate.getDate()); // Récupère le jour
      var moodScore = parseInt(dataHistory[i].mood_score); // Récupère le mood score

      /* Condition sur le mois (getMonth initialise janvier à 0)
        Modifie la Table correspondante au mois et remplace le jour avec un Mood enregistré par une icone colorée
        moodScoreCircle retourne une icône fontAwesome avec une couleur différente en fonction du score
      */
      switch (month) {
        case 0:
          jan[day] = moodScoreCircle(moodScore);
          break;
        case 1:
          feb[day] = moodScoreCircle(moodScore);
          break;
        case 2:
          mar[day] = moodScoreCircle(moodScore);
          break;
        case 3:
          apr[day] = moodScoreCircle(moodScore);
          break;
        case 4:
          may[day] = moodScoreCircle(moodScore);
          break;
        case 5:
          jun[day] = moodScoreCircle(moodScore);
          break;
        case 6:
          jul[day] = moodScoreCircle(moodScore);
          break;
        case 7:
          aug[day] = moodScoreCircle(moodScore);
          break;
        case 8:
          sep[day] = moodScoreCircle(moodScore);
          break;
        case 9:
          oct[day] = moodScoreCircle(moodScore);
          break;
        case 10:
          nov[day] = moodScoreCircle(moodScore);
          break;
        case 11:
          dec[day] = moodScoreCircle(moodScore);
          break;
      }
    }

    // Modifie la variable d'état dataDisplay qui récupère tous les tableaux concernés
    setDataDisplay([
      jan,
      feb,
      mar,
      apr,
      may,
      jun,
      jul,
      aug,
      sep,
      oct,
      nov,
      dec,
    ]);
  };

  // Fonction qui prend en variable le score et qui retourne un cercle avec la couleur associée à la note
  const moodScoreCircle = (score) => {
    switch (score) {
      case 1:
        return (
          <FontAwesome
            color="#CD6133"
            name="circle"
            size={13}
            style={{ alignSelf: "center" }}
          />
        );
      case 2:
        return (
          <FontAwesome
            color="#F0A07E"
            name="circle"
            size={13}
            style={{ alignSelf: "center" }}
          />
        );
      case 3:
        return (
          <FontAwesome
            color="#F0D231"
            name="circle"
            size={13}
            style={{ alignSelf: "center" }}
          />
        );
      case 4:
        return (
          <FontAwesome
            color="#44B79D"
            name="circle"
            size={13}
            style={{ alignSelf: "center" }}
          />
        );
      case 5:
        return (
          <FontAwesome
            color="#54857F"
            name="circle"
            size={13}
            style={{ alignSelf: "center" }}
          />
        );
    }
  };

  // Table qui contient les labels des jours
  var tableTitle = [
    " ",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
    "19",
    "20",
    "21",
    "22",
    "23",
    "24",
    "25",
    "26",
    "27",
    "28",
    "29",
    "30",
    "31",
  ];

  return (
    <View style={styles.container}>
      <SwitchSelector
        options={[
          { label: "Semaine", value: 1 },
          { label: "Mois", value: 2 },
          { label: "Année", value: 3 },
        ]}
        textColor="#5B63AE" //
        selectedColor="white"
        buttonColor="#5B63AE"
        borderColor="#5B63AE"
        hasPadding
        initial={2}
        style={{
          width: 300,
          alignSelf: "flex-end",
          marginRight: 17,
          marginTop: 63,
        }}
        onPress={(value) => props.changeStep(value)}
      />
      <View
        style={{
          // flex: 1,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: 20,
          marginBottom: 10,
          padding: 5,
        }}
      >
        <TouchableOpacity
        onPress={() => yearSelect("prev")}
        >
          <FontAwesome
            name="chevron-left"
            size={24}
            color="#57706D"
            style={{marginLeft: 15}}
          />
        </TouchableOpacity>
        <Text>{yearDisplay}</Text>
        <TouchableOpacity
        onPress={() => yearSelect("next")}
        >
          <FontAwesome
            name="chevron-right"
            size={24}
            color="#57706D"
            style={{marginRight: 15}}
          />
        </TouchableOpacity>
      </View>
      <Card borderRadius={30} height={(Dimensions.get("window").height*65)/100} justifyContent="center">
        <ScrollView>
          <Table>
            <View
              style={{ flexDirection: "row", backgroundColor: "#11ffee00" }}
            >
              <TableWrapper style={{ flexDirection: "row" }}>
                <Col
                  data={tableTitle}
                  width={20}
                  height={15}
                  textStyle={{ textAlign: "center", color: "#57706D" }}
                />
                </TableWrapper>
                <TableWrapper style={{ flex: 1, backgroundColor: "#11ffee00" }}>
                  <Cols
                    data={dataDisplay}
                    style={{ flex: 1 }}
                    height={15}
                    textStyle={{ textAlign: "center", color: "#57706D" }}
                  />
                </TableWrapper>
              </View>
            </Table>
          </ScrollView>
        </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-start",
    backgroundColor: "#CEFFEB",
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  paragraph: {
    fontWeight: "bold",
    fontSize: 30,
    textAlign: "center",
    color: "#009788",
    marginTop: 70,
  },
  HeadStyle: {
    height: 50,
    alignContent: "space-between",
    backgroundColor: "#ffffff",
  },
  TableText: {
    margin: 1,
    alignContent: "center",
    textAlign: "center",
    color: "#44B79D",
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
    justifyContent: "flex-start",
    flexDirection: "column",
  },
  singleHead: {
    width: 20,
    height: 20,
    backgroundColor: "#c8e1ff",
  },
});

const mapDispatchToProps = (dispatch) => {
  return {
    changeStep: (newstep) => {
      dispatch({ type: "change-step", newstep: newstep });
    },
  };
};

const mapStateToProps = (state) => {
  return {
    mood: state.mood,
    step: state.step,
    pseudo: state.pseudo,
    token: state.token,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChartsYearScreen);
