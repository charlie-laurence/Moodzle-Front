import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { Card, Button } from "react-native-elements";
import { FontAwesome5 } from "@expo/vector-icons";
import { connect } from "react-redux";
import { proxy } from "../statics/ip";
import { moodData } from "../statics/icon";

function HistoryScreen({ updateMood, token }) {
  const [historyFromBack, setHistoryFromBack] = useState([]);

  /* Interroger le backend pour récupérer l'historique de l'utilisateur au chargement de la page : */
  useEffect(() => {
    async function fetchData() {
      var rawResponse = await fetch(`${proxy}/dashboard/${token}`);
      var response = await rawResponse.json();
      var responseHistory = response.history;
      setHistoryFromBack(responseHistory);
    }
    fetchData();
  }, []);

  /* Exploiter l'historique de l'utilisateur pour afficher ses infos : */
  var moodList = historyFromBack.reverse().map((item, i) => {
    // Formatage des dates :
    var date = new Date(item.date);
    var format =
      date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();

    // Récupérer les activités de chaques jours :
    var activityList = [];
    for (var j = 0; j < item.activity.length; j++) {
      activityList.push(item.activity[j].name);
    }

    // Style particulier pour Key = 0 :
    if (i === 0) {
      var wrapperDesign = styles.cardWrapper0;
      var containerDesign = styles.cardContainer0;
    } else {
      var wrapperDesign = styles.cardWrapper;
      var containerDesign = styles.cardWrapper;
    }

    return (
      <Card
        key={i}
        wrapperStyle={wrapperDesign}
        containerStyle={containerDesign}
      >
        <FontAwesome5
          style={{ margin: 15 }}
          name={moodData[item.mood_score - 1].icon}
          size={70}
          color={moodData[item.mood_score - 1].color}
          score={item.mood_score}
        />
        <Card.Title style={{ color: "#57706D" }}>
          <Text>{format}</Text>
        </Card.Title>
        <Card.Title style={{ color: "#57706D" }}>
          <Text>{activityList.join(", ")}</Text>
        </Card.Title>
      </Card>
    );
  });

  return (
    <View style={styles.container}>
      <Text style={styles.paragraph}>Tableau de Bord</Text>
      <View>
        <Button
          title={"Modifier mon mood"}
          titleStyle={{ color: "white", fontSize: 16 }}
          buttonStyle={{
            backgroundColor: "#54857F",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 50,
            width: 150,
            marginBottom: 10,
            marginTop: 15,
            marginLeft: 15,
          }}
          onPress={() => {
            updateMood();
          }}
        />
        <ScrollView>{moodList}</ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F0FFF9",
  },
  cardWrapper0: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    height: 250,
  },
  cardContainer0: {
    padding: 0,
    backgroundColor: "white",
    shadowColor: "#F0FFF9",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
    borderColor: "white",
    borderRadius: 25,
  },
  cardWrapper: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    height: 150,
  },
  cardContainer: {
    padding: 0,
    backgroundColor: "white",
    shadowColor: "#F0FFF9",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
    borderColor: "white",
    borderRadius: 25,
  },
  paragraph: {
    fontWeight: "bold",
    fontSize: 30,
    textAlign: "center",
    color: "#009788",
    marginTop: 50,
  },
});

const mapDispatchToProps = (dispatch) => {
  return {
    updateMood: () => {
      dispatch({ type: "update-mood" });
    },
  };
};

const mapStateToProps = (state) => {
  return {
    activitySelection: state.activitySelection,
    mood: state.mood,
    token: state.token,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HistoryScreen);
