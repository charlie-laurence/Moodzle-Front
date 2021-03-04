import React, {useState, useEffect} from "react";
import { StyleSheet, Text, View, Button, ScrollView, Flat } from "react-native";
import { Card } from "react-native-elements";
import { FontAwesome5 } from "@expo/vector-icons";
import { connect } from "react-redux";
import { _IP_OLIV , _IP_CAPSULE } from "../statics/ip";
import { moodData } from "../statics/icon";

function HistoryScreen({ navigation, updateMood }) {
  const [historyFromBack , setHistoryFromBack] = useState([]);

  /* Interroger le backend pour récupérer l'historique de l'utilisateur au chargement de la page : */
  useEffect(() => {
    async function fetchData() {
      var rawResponse = await fetch(`http://${_IP_CAPSULE}:3000/dashboard`);
      var response = await rawResponse.json();
      setHistoryFromBack(response.history);
    }
    fetchData();
  }, []);

  /* Exploiter l'historique de l'utilisateur pour afficher ses infos : */
    var moodList = historyFromBack.map((item, i) => {

      var activityList = [];
      for (var j=0 ; j<item.activity.length ; j++) {
        activityList.push(item.activity[j].name);
      }

    return (
    <Card
      key={i}
      bottomDivider
      wrapperStyle={styles.cardWrapper}
      containerStyle={styles.cardContainer}
    >
      <FontAwesome5
        style={{margin:15}}
        key={i}
        name={moodData[item.mood_score-1].icon}
        size={70}
        color={moodData[item.mood_score-1].color}
        score={item.mood_score}
      />
      <Card.Title style={{color:"#57706D"}}>
        <Text>{item.date}</Text>
      </Card.Title>
      <Card.Title style={{color:"#57706D"}}>
        <Text>{activityList.join(", ")}</Text>
      </Card.Title>
    </Card>
    )
  })

  return (
    <View style={styles.container}>
      <Text style={styles.paragraph}>Tableau de Bord</Text>
      <Button
        title="RETOUR SUR AJOUT MOOD"
        type="solid"
        buttonStyle={{ backgroundColor: "#009788" }}
        onPress={() => {
          updateMood();
        }}
      />
      <View
      // style={{paddingBottom:200}}
      >
      <ScrollView>
        {moodList}
      </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor:"#F0FFF9",
  },
  cardWrapper: {
    display:"flex",
    justifyContent:"space-around",
    alignItems:"center",
    height:150,
  },
  cardContainer: {
    padding:0,
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HistoryScreen);
