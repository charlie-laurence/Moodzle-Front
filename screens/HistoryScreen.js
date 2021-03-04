import React, {useState, useEffect} from "react";
import { StyleSheet, Text, View, Button, ScrollView, Flat } from "react-native";
import { Card } from "react-native-elements";
import { connect } from "react-redux";
import { _IP_OLIV , _IP_CAPSULE } from "../statics/ip";

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
    return (
    <Card
      key={i}
      bottomDivider
    >
      <Card.Title>
        <Text>{item.mood_score}</Text>
      </Card.Title>
      <Card.Title>
        <Text>{item.date}</Text>
      </Card.Title>
    </Card>
    )
  })

  return (
    <View>
      <Text style={styles.paragraph}>Tableau de Bord</Text>
      <Button
        title="RETOUR SUR AJOUT MOOD"
        type="solid"
        buttonStyle={{ backgroundColor: "#009788" }}
        onPress={() => {
          updateMood();
        }}
      />
      <ScrollView>
        {moodList}
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
    marginTop: 70,
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
