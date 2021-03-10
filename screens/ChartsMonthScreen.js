import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import { PieChart, LineChart } from "react-native-chart-kit";
import { connect } from "react-redux";
import { LocaleConfig } from "react-native-calendars";
import { Card } from "react-native-elements";
import SwitchSelector from "react-native-switch-selector";
import { FontAwesome } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { proxy } from "../statics/ip";
import CalendarObj from "./Component/Calendar";

const monthList = [
  "Janvier",
  "Février",
  "Mars",
  "Avril",
  "Mai",
  "Juin",
  "Juillet",
  "Août",
  "Septembre",
  "Octobre",
  "Novembre",
  "Décembre",
];
var displayMonth = (month) => {
  for (let i = 0; i < monthList.length; i++) {
    if (i === month) {
      return monthList[i];
    }
  }
};

// Fonction qui vérifie si une année est bissextille
function isLeapYear(year) {
  return year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0);
}

function ChartsMonthScreen(props) {
  const [pieData, setPieData] = useState([]);
  const [startDate, setStartDate] = useState(
    new Date().toISOString().substring(0, 10)
  );
  const [lineLabel, setLineLabel] = useState([""]);
  const [lineData, setLineData] = useState([0]);
  const [calendarData, setCalendarData] = useState({});
  const [topActivities, setTopActivities] = useState(["", "", ""]);
  const [monthDisplay, setMonthDisplay] = useState(
    displayMonth(new Date().getMonth())
  );
  const [yearDisplay, setYearDisplay] = useState(new Date().getFullYear());
  const [randomKey, setRandomKey] = useState(Math.random() * 1000);

  /* Hook d'effet Ã  l'ouverture de la page pour charger les données*/
  useEffect(() => {
    fetchData();
    setRandomKey(Math.random() * 1000);
    // Enregistrer les dates de départ et de fin pour le Calendrier
  }, [startDate]);

  // Fonction qui récupÃ¨re les données du back + traite les données pour l'affichage sur les graphes
  var fetchData = async () => {
    var dataRaw = await fetch(`${proxy}/history`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `startdate=${startDate}&type=month&token=${props.token}`,
    });

    var data = await dataRaw.json();
    var dataHistory = data.history;

    // Top activités

    // Récupération du tableau d'activités
    var allMonthActivities = [];
    var eachMonthActivity = [];

    for (var i = 0; i < dataHistory.length; i++) {
      allMonthActivities.push(dataHistory[i].activity);
    }

    // Aller récupérer les activités de chaque jour (certains ayant plusieurs activités)
    for (var j = 0; j < allMonthActivities.length; j++) {
      for (var i = 0; i < allMonthActivities[j].length; i++) {
        eachMonthActivity.push(allMonthActivities[j][i].name);
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

    // Boucle qui remplace les "undefined" des top activities en vide
    for (let i = 0; i < 3; i++) {
      if (topSortActivities[i] === undefined) {
        topSortActivities[i] = "";
      }
    }
    setTopActivities([
      topSortActivities[0],
      topSortActivities[1],
      topSortActivities[2],
    ]);

    var markedSetDate = {};

    for (let i = 0; i < dataHistory.length; i++) {
      var markColor = "";
      var dateConvertToString = new Date(dataHistory[i].date)
        .toISOString()
        .substring(0, 10);
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
      markedSetDate[dateConvertToString] = {
        selected: true,
        selectedColor: markColor,
      };
    }
    setCalendarData({ ...markedSetDate });

    // Traitement des données pour le Pie Chart
    pieDataGenerator(dataHistory);
    lineGenerator(dataHistory);
  };

  /* Fonction qui calcule le nombre d'occurence pour chaque score de mood */
  var pieDataGenerator = (dataset) => {
    // Initialisation des scores Ã  0
    let score1 = 0;
    let score2 = 0;
    let score3 = 0;
    let score4 = 0;
    let score5 = 0;

    // Incrémenter les scores de 1 Ã  chaque fois qu'une note des données correspondent
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
      {
        name: "angry",
        score: 1,
        count: score1,
        color: "#CD6133",
        legendFontColor: "#CD6133",
        legendFontSize: 15,
      },
      {
        name: "sad-cry",
        score: 2,
        count: score2,
        color: "#F0A07E",
        legendFontColor: "#F0A07E",
        legendFontSize: 15,
      },
      {
        name: "meh",
        score: 3,
        count: score3,
        color: "#F0D231",
        legendFontColor: "#F0D231",
        legendFontSize: 15,
      },
      {
        name: "grin-squint",
        score: 4,
        count: score4,
        color: "#44B79D",
        legendFontColor: "#44B79D",
        legendFontSize: 15,
      },
      {
        name: "smile-beam",
        score: 5,
        count: score5,
        color: "#54857F",
        legendFontColor: "#54857F",
        legendFontSize: 15,
      },
    ]);
  };

  /* Fonction qui récupère les données pour la courbe */
  var lineGenerator = (dataset) => {
    // console.log(dataset)
    let lineLabelsArray = [];
    let lineDataArray = [];

    var startDateFormat = new Date(startDate);
    var yearDate = startDateFormat.getFullYear();
    var monthDate = startDateFormat.getMonth();
    var bissextile = isLeapYear(yearDate);
    var firstSetDayNum = 1;
    var lastSetDayNum = 1;
    switch (monthDate) {
      case 0:
        lastSetDayNum = 31;
        break;
      case 1:
        // Vérifier si années bissextile (28j si oui, 29j sinon)
        bissextile ? (lastSetDayNum = 29) : (lastSetDayNum = 28);
        break;
      case 2:
        lastSetDayNum = 31;
        break;
      case 3:
        lastSetDayNum = 30;
        break;
      case 4:
        lastSetDayNum = 31;
        break;
      case 5:
        lastSetDayNum = 30;
        break;
      case 6:
        lastSetDayNum = 31;
        break;
      case 7:
        lastSetDayNum = 31;
        break;
      case 8:
        lastSetDayNum = 30;
        break;
      case 9:
        lastSetDayNum = 31;
        break;
      case 10:
        lastSetDayNum = 30;
        break;
      case 11:
        lastSetDayNum = 31;
        break;
    }

    for (let i = firstSetDayNum; i <= lastSetDayNum; i++) {
      i % 5 === 0 ? lineLabelsArray.push(`${i}`) : lineLabelsArray.push("");
    }

    // Filtrer les dates doublons

    let unique = [];
    let uniqueDataset = [];
    dataset.forEach((element) => {
      if (
        !unique.includes(parseInt(element.date.substring(8, 10))) &&
        monthDate + 1 === parseInt(element.date.substring(5, 7))
      ) {
        unique.push(parseInt(element.date.substring(8, 10)));
        uniqueDataset.push(element);
      }
    });

    var uniqueDataSetLength = uniqueDataset.length;
    var j = 0;
    for (let i = 0; i < lineLabelsArray.length; i++) {
      if (j >= uniqueDataSetLength) {
        lineDataArray.push(0);
        continue;
      } else if (i + 1 === parseInt(uniqueDataset[j].date.substring(8, 10))) {
        lineDataArray.push(parseInt(uniqueDataset[j].mood_score));
        j += 1;
      } else {
        lineDataArray.push(0);
      }
    }
    // Générer les labels
    // Puis générer les data
    setLineLabel(lineLabelsArray);
    setLineData(lineDataArray);
  };

  // Fonction qui gere la sélection du mois
  var monthSelect = (type) => {
    var year = yearDisplay;
    var startDateConvert = new Date(startDate);
    console.log("start date converti", startDateConvert);
    var month = startDateConvert.getMonth();
    var todayMonth = new Date().getMonth();
    var todayYear = new Date().getFullYear();
    var dateDay = startDateConvert.getDate();
    var bissextile = isLeapYear(year);

    if (type === "prev") {
      month = startDateConvert.getMonth() - 1;
    } else if (type === "next" && month >= todayMonth && year === todayYear) {
      return;
    } else if (type === "next") {
      month = startDateConvert.getMonth() + 1;
    }

    if (month === -1) {
      month = 11;
      year = yearDisplay - 1;
    } else if (month === 12) {
      month = 0;
      year = yearDisplay + 1;
    }

    startDateConvert.setMonth(month);
    startDateConvert.setFullYear(year);

    var filterDate = startDateConvert;
    var filterDateISO = filterDate.toISOString();

    setStartDate(filterDateISO.substring(0, 10));
    setMonthDisplay(displayMonth(filterDate.getMonth()));
    setYearDisplay(filterDate.getFullYear());
  };

  // Calendrier
  LocaleConfig.locales["fr"] = {
    monthNames: [
      "Janvier",
      "Février",
      "Mars",
      "Avril",
      "Mai",
      "Juin",
      "Juillet",
      "Août",
      "Septembre",
      "Octobre",
      "Novembre",
      "Décembre",
    ],
    monthNamesShort: [
      "Janv.",
      "Févr.",
      "Mars",
      "Avril",
      "Mai",
      "Juin",
      "Juil.",
      "Août",
      "Sept.",
      "Oct.",
      "Nov.",
      "Déc.",
    ],
    dayNames: [
      "Dimanche",
      "Lundi",
      "Mardi",
      "Mercredi",
      "Jeudi",
      "Vendredi",
      "Samedi",
    ],
    dayNamesShort: ["Dim.", "Lun.", "Mar.", "Mer.", "Jeu.", "Ven.", "Sam."],
    today: "Aujourd'hui",
  };
  LocaleConfig.defaultLocale = "fr";

  return (
    <View backgroundColor="#CEFFEB">
      <ScrollView marginBottom={0} paddingBottom={20}>
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
          initial={1}
          style={{
            width: 300,
            alignSelf: "flex-end",
            marginTop: 63,
            marginRight: 17,
          }}
          onPress={(value) => props.changeStep(value)}
        />

        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginTop: 30,
            marginBottom: 10,
            padding: 5,
          }}
        >
          <TouchableOpacity onPress={() => monthSelect("prev")}>
            <FontAwesome
              name="chevron-left"
              size={24}
              color="#57706D"
              style={{ marginLeft: 15 }}
            />
          </TouchableOpacity>
          <Text>
            {monthDisplay} {yearDisplay}
          </Text>
          <TouchableOpacity onPress={() => monthSelect("next")}>
            <FontAwesome
              name="chevron-right"
              size={24}
              color="#57706D"
              style={{ marginRight: 15 }}
            />
          </TouchableOpacity>
        </View>

        <Card borderRadius={50} containerStyle={{ height: 300 }}>
          <Card.Title style={{ color: "#57706D" }}>
            Top des activités du mois
          </Card.Title>
          <Card.Divider />
          <View
            style={{
              flexDirection: "row",
              paddingBottom: 0,
              marginBottom: 0,
            }}
          >
            <Image
              source={require("../assets/podium_moodzle_moodz.png")}
              style={{
                width: 220,
                height: 220,
                resizeMode: "stretch",
                paddingRight: 0,
                marginLeft: 20,
                marginTop: 0,
                paddingTop: 0,
              }}
            />
            <View style={{ marginLeft: -10, width: 100, marginTop: 30 }}>
              <Text style={{ color: "#57706D" }}>
                <FontAwesome
                  name="circle"
                  size={10}
                  color="#5B63AE"
                  iconStyle={{ marginRight: 10 }}
                />
                {` ${topActivities[0]}`}
              </Text>
              <Text style={{ color: "#57706D" }}>
                <FontAwesome
                  name="circle"
                  size={10}
                  color="#44B79D"
                  style={{ alignSelf: "center", marginRight: 50 }}
                />
                {` ${topActivities[1]}`}
              </Text>
              <Text style={{ color: "#57706D" }}>
                <FontAwesome
                  name="circle"
                  size={10}
                  color="#df8f4a"
                  style={{ alignSelf: "center", marginRight: 50 }}
                />
                {` ${topActivities[2]}`}
              </Text>
            </View>
          </View>
        </Card>

        <Card borderRadius={50} style={{ marginBottom: 10 }}>
          <Card.Title style={{ color: "#57706D" }}>
            Calendrier des humeurs
          </Card.Title>
          <Card.Divider />
          <CalendarObj
            key={randomKey}
            date={startDate}
            dataset={calendarData}
          />
        </Card>

        <Card borderRadius={50}>
          <Card.Title style={{ color: "#57706D" }}>
            Répartition des humeurs du mois
          </Card.Title>
          <Card.Divider />
          <View
            style={{
              flexDirection: "row",
              paddingBottom: 0,
              marginBottom: 0,
              flex: 1,
            }}
          >
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
              alignItems={"center"}
            />
            <View style={{ marginTop: 32, marginLeft: -130, width: 100 }}>
              <Text style={{ marginBottom: 8 }}>
                <FontAwesome5 name="angry" size={25} color="#CD6133" />
              </Text>
              <Text style={{ marginBottom: 8 }}>
                <FontAwesome5 name="sad-cry" size={25} color="#F0A07E" />
              </Text>
              <Text style={{ marginBottom: 8 }}>
                <FontAwesome5 name="meh" size={25} color="#F0D231" />
              </Text>
              <Text style={{ marginBottom: 8 }}>
                <FontAwesome5 name="grin-squint" size={25} color="#44B79D" />
              </Text>
              <Text style={{ marginBottom: 8 }}>
                <FontAwesome5 name="smile-beam" size={25} color="#54857F" />
              </Text>
            </View>
          </View>
        </Card>

        <Card borderRadius={50}>
          <Card.Title style={{ color: "#57706D" }}>
            Variation des humeurs du mois
          </Card.Title>
          <Card.Divider />
          <LineChart
            data={{
              labels: lineLabel,
              datasets: [{ data: lineData }],
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
              paddingTop: 10,
            }}
          />
        </Card>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
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
    borderRadius: 16,
  },
  propsForDots: {
    r: "1",
    strokeWidth: "3",
    stroke: "#F0A07E",
  },
};

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

export default connect(mapStateToProps, mapDispatchToProps)(ChartsMonthScreen);
