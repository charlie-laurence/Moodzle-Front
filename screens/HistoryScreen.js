import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, Text, View, ScrollView, Dimensions } from "react-native";
import { Card, Button } from "react-native-elements";
import { FontAwesome5 } from "@expo/vector-icons";
import { connect } from "react-redux";
import { proxy } from "../statics/ip";
import { moodData } from "../statics/icon";

function HistoryScreen({ updateMood, token }) {
  const [historyFromBack, setHistoryFromBack] = useState([]);
  const [loading, setLoading] = useState(true);
  let refScroll = useRef(null);

  /* Interroger le backend pour récupérer l'historique de l'utilisateur au chargement de la page : */
  useEffect(() => {
    async function fetchData() {
      var rawResponse = await fetch(`${proxy}/dashboard/${token}`);
      var response = await rawResponse.json();
      var responseHistory = response.history;
      setHistoryFromBack(responseHistory);
      setLoading(false);
    }
    fetchData();
  }, []);

  /* Exploiter l'historique de l'utilisateur pour afficher ses infos : */
  var historyLength = historyFromBack.length;
  
  var moodList = historyFromBack.map((item, i) => {
    // Formatage des dates :
    var date = new Date(item.date);
    var format =
      date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();

    // Récupérer les activités de chaques jours :
    var activityList = [];
    for (var j = 0; j < item.activity.length; j++) {
      activityList.push(item.activity[j].name);
    }

    // Style particulier pour la 1ère Card :
    if (i === (historyLength - 1)) {
      var wrapperDesign = styles.cardWrapper0;
      var containerDesign = styles.cardContainer0;
    } else {
      var wrapperDesign = styles.cardWrapper;
      var containerDesign = styles.cardContainer;
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

  // Page de chargement :
  if (loading) {
    return <View style={styles.container}></View>;
  }

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Button
          title={"Modifier mon mood"}
          titleStyle={{ color: "white", fontSize: 16 }}
          buttonStyle={{
            backgroundColor: "#5B63AE",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 30,
            width: (Dimensions.get("window").width * 50) / 100,
            height: (Dimensions.get("window").width * 15) / 100,
            marginTop: 55,
          }}
          onPress={() => {
            updateMood();
          }}
        />
        {
          <Button
            icon={
              <FontAwesome5
                name="arrow-alt-circle-up"
                size={26}
                color="#57706D"
              />
            }
            buttonStyle={{
              backgroundColor: "transparent",
              justifyContent: "flex-end",
              alignItems: "center",
              borderRadius: 30,
              width: (Dimensions.get("window").width * 33) / 100,
              height: (Dimensions.get("window").width * 15) / 100,
              marginTop: 55,
            }}
            onPress={() => {
              refScroll.current?.scrollTo({ y: 0, animated: true });
            }}
          />
        }
      </View>
      <ScrollView
        decelerationRate="fast"
        scrollEventThrottle={200}
        ref={refScroll}
      >
        {moodList.reverse()}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#CEFFEB",
    justifyContent: "center",
    alignItems: "center",
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    paddingBottom: 14,
  },
  cardWrapper0: {
    width: (Dimensions.get("window").width * 90) / 100,
    height: (Dimensions.get("window").width * 60) / 100,
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
  },
  cardContainer0: {
    padding: 0,
    marginBottom: 15,
    backgroundColor: "white",
    shadowColor: "white",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 7,
    borderColor: "white",
    borderRadius: 25,
  },
  cardWrapper: {
    width: (Dimensions.get("window").width * 90) / 100,
    height: (Dimensions.get("window").width * 40) / 100,
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
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
    elevation: 5,
    borderColor: "white",
    borderRadius: 25,
    marginBottom: 10,
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
