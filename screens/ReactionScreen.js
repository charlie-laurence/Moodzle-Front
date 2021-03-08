import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Dimensions, ImageBackground } from "react-native";
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
      <ImageBackground source={require("../assets/ReactionScreen.png")} style={styles.container}>
        <View style={styles.btnContainer}>
          <Button
            buttonStyle={{ backgroundColor: "#F0D231", width: 60, height: 60, borderRadius: 50, marginTop:25}}
            title={"OK"}
            titleStyle={{ color: "white", fontSize: 16 }}
            onPress={() => {
              incrementStep();
            }}
          />
        </View>
        {moodzIntroduction}
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#CEFFEB",
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
    marginTop: 0
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
