import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StyleSheet, ImageBackground, Text, View } from "react-native";
import { Button, Input } from "react-native-elements";
import { connect } from "react-redux";
import { proxy } from "../statics/ip";
import SignIn from "./Component/SignIn";
import SignUp from "./Component/SignUp";
import SignBtn from "./Component/SignBtn";

function HomeScreen({
  navigation,
  pseudo,
  onSubmitPseudo,
  token,
  addToken,
  displayHistory,
  reloadActivity,
  reloadMood,
}) {
  /* 
- récupération de la valeur depuis l'input et mise à jour de l'état pseudo
- initialisation d'un état pseudoSubmited à false pour gérer la différence 
d'affichage entre un utilisateur déjà enregistré et un nouvel utilisateur
*/

  const [localPseudo, setLocalPseudo] = useState("");
  const [userExist, setUserExist] = useState(false);

  useEffect(() => {
    //Récupération des données utilisateurs (pseudo, token) dans local storage et affectation au store
    AsyncStorage.getItem("user", (err, value) => {
      if (value) {
        value = JSON.parse(value);
        onSubmitPseudo(value.pseudo);
        addToken(value.token);
        setUserExist(true);
      }
    });
    getDailyMood(token);
  }, [userExist]);

  //Fonction pour récupérer les données de l'utilisateur pour vérifier si un mood a été renseigné ce-jour (appelée dans le useEffect)
  const getDailyMood = async (token) => {
    try {
      const rawResult = await fetch(
        // `proxy/daily-mood/${token}`
        `${proxy}/daily-mood/${token}`
      );
      const result = await rawResult.json();
      if (result.mood) {
        displayHistory(); //état step du reducer passé @4
        const activityToReload = result.mood_data.activity.map((activity) => ({
          name: activity.name,
          category: activity.category,
        }));
        reloadActivity(activityToReload); //état activitySelection du reducer repeuplé avec les activités renseignées et enregistrées en BDD
        reloadMood(result.mood_data.id); //état storedMoodId mis à jour avec l'id du mood déjà renseigné en BDD
      } else {
        reloadMood("");
      }
    } catch (err) {
      console.log("bonjour je suis l'erreur");
      console.log(err);
    }
  };

  //Fonction de création d'un utilisateur (BDD, Store et Local Storage)
  var handleSubmitSignup = async () => {
    try {
      // Envoi du pseudo du nouvel utilisateur vers le back pour l'enregistrer en BDD (récupération d'un toker depuis back)
      const data = await fetch(`${proxy}/sign-up`, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `usernameFromFront=${localPseudo}`,
      });

      const body = await data.json();
      console.log("result :", body.result);

      let newPseudo = body.saveUser.username;
      let newToken = body.token;

      if (body.result === true) {
        // Ajout de l'utilisateur au store :
        onSubmitPseudo(newPseudo);
        addToken(newToken);
        setUserExist(true);
      }
      // Ajout de l'utilisateur en local storage :
      AsyncStorage.setItem(
        "user",
        JSON.stringify({ pseudo: newPseudo, token: newToken })
      );
    } catch (err) {
      console.log("something went wrong with sign-up process");
    }
  };

  //Défition de l'affichage selon si les données de l'utilisateur sont enregistrées en localstorage ou non
  var isUserRegistered;
  if (userExist === false) {
    //Si Non => Formulaire pour rentrer ses informations : Sign UP (Sign IN doit être ajouté)
    isUserRegistered = (
      <View>
        <Input
          containerStyle={{ marginBottom: 25, width: 200 }}
          inputStyle={{ marginLeft: 10 }}
          placeholder="Nom d'utilisateur"
          onChangeText={(content) => {
            setLocalPseudo(content);
          }}
        />
        <Button
          title="C'est parti !"
          type="solid"
          buttonStyle={{ backgroundColor: "#009788" }}
          onPress={() => {
            handleSubmitSignup();
            navigation.navigate("BottomNavigator", { screen: "Mood" });
          }}
        />
      </View>
    );
  } else if (userExist === true) {
    //Si Oui => Message de Bienvenue
    isUserRegistered = (
      <View>
        <Text style={styles.paragraph}>Bienvenue {pseudo}</Text>
        <Button
          title="C'est parti !"
          type="solid"
          buttonStyle={{ backgroundColor: "#009788" }}
          onPress={() => {
            navigation.navigate("BottomNavigator", { screen: "Mood" });
          }}
        />
      </View>
    );
  }

  return (
    // <ImageBackground
    //   source={require("../assets/MoodzSignUp.png")}
    //   style={styles.container}
    // >
    //   {isUserRegistered}
    // </ImageBackground>
    <ImageBackground
      source={require("../assets/MoodzSignUp.png")}
      style={styles.container}
    >
      <SignBtn />
      <SignIn />
      <SignUp />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  paragraph: {
    fontWeight: "normal",
    fontSize: 25,
    textAlign: "center",
    color: "black",
    marginBottom: 20,
  },
});

function mapDispatchToProps(dispatch) {
  return {
    onSubmitPseudo: function (pseudo) {
      dispatch({ type: "savePseudo", pseudo: pseudo });
    },
    addToken: function (token) {
      dispatch({ type: "addToken", token: token });
    },
    displayHistory: function () {
      dispatch({ type: "mood-already-entered" });
    },
    reloadActivity: (activity) => {
      dispatch({ type: "reload", activity });
    },
    reloadMood: (id) => {
      dispatch({ type: "store-moodId", id });
    },
  };
}

function mapStateToProps(state) {
  return {
    pseudo: state.pseudo,
    token: state.token,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
