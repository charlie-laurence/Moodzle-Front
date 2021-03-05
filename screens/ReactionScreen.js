import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Dimensions, Image } from "react-native";
import { Button } from "react-native-elements";
import { connect } from "react-redux";
import {
  useFonts,
  LondrinaSolid_400Regular,
} from "@expo-google-fonts/londrina-solid";
import { proxy } from "../statics/ip";

function ReactionScreen({ mood, incrementStep, token, pseudo }) {
  let [fontsLoaded] = useFonts({
    LondrinaSolid_400Regular,
  });

  // initialisation d'un état funFact en string vide
  const [funFact, setFunFact] = useState("");

  /* au chargement du composant, appel de la route fun-fact en BDD, 
    à laquelle on envoie le mood enregistré dans le store pour récupérer
    les funfacts correspondant au score du Mood sélectionné */
  useEffect(() => {
    async function fetchData() {
      var rawResponse = await fetch(`${proxy}/fun-fact`, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `mood=${mood}`,
      });

      /*actualisation de l'état funFact via la réponse reçue depuis le back
      (on lui envoie directement une phrase aléatoirement choisie, correspondant au mood renseigné) */
      var response = await rawResponse.json();
      setFunFact(response);
    }
    fetchData();
  }, []);

  // console.log(mood);

  // console.log("funFact :", funFact)

  if (!fontsLoaded) {
    return (
      <View>
        <Text>App is loading</Text>
      </View>
    );
  } else {
    // on conditionne l'intro de Moodz avant le funFact selon le mood renseigné
    var moodzIntroduction;
    if (mood <= 2) {
      moodzIntroduction = (
        <View style={styles.reaction}>
          <Text
            style={{
              fontFamily: "LondrinaSolid_400Regular",
              fontSize: 27,
              color: "#DF8F4A",
            }}
          >
            {pseudo},
          </Text>
          <Text
            style={{
              fontFamily: "LondrinaSolid_400Regular",
              fontSize: 20,
              color: "#DF8F4A",
            }}
          >
            {funFact}
          </Text>
        </View>
      );
    } else if (mood >= 3) {
      moodzIntroduction = (
        <View style={styles.reaction}>
          <Text
            style={{
              fontFamily: "LondrinaSolid_400Regular",
              fontSize: 20,
              color: "#DF8F4A",
            }}
          >
            {pseudo}, le savais-tu :
          </Text>
          <Text
            style={{
              fontFamily: "LondrinaSolid_400Regular",
              fontSize: 20,
              color: "#DF8F4A",
            }}
          >
            {funFact}
          </Text>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <Image style={styles.liane} source={require("../assets/liane2.png")} />
        <Image style={styles.moodz} source={require("../assets/moodz.png")} />
        <View style={styles.btnContainer}>
          <Button
            buttonStyle={{ backgroundColor: "#fff", width: 60 }}
            title={"OK"}
            titleStyle={{ color: "#5B63AE", fontSize: 16, padding: 10 }}
            onPress={() => {
              incrementStep();
            }}
          />
        </View>
        {moodzIntroduction}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F0FFF9",
    alignItems: "center",
    justifyContent: "center",
    height: Dimensions.get("window").height,
  },
  paragraph: {
    fontWeight: "bold",
    fontSize: 30,
    textAlign: "center",
    color: "#009788",
  },
  btnContainer: {
    flex: 0.5,
    flexDirection: "row",
    justifyContent: "flex-end",
    width: Dimensions.get("window").width,
    marginTop: 15,
    padding: 25,
  },
  reaction: {
    flex: 1,
    marginLeft: 30,
    marginRight: 30,
    // alignItems: "flex-start",
  },
  liane: {
    position: "absolute",
    width: 560,
    height: 485,
    left: -110,
    top: -230,
  },
  moodz: {
    position: "absolute",
    width: 340,
    height: 565,
    left: 125,
    top: 475,
    zIndex: 1,
  },
});

const mapDispatchToProps = (dispatch) => {
  return {
    incrementStep: () => {
      dispatch({ type: "next-step" });
    },
  };
};

const mapStateToProps = (state) => {
  return {
    mood: state.mood,
    pseudo: state.pseudo,
    token: state.token,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ReactionScreen);
