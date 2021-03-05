import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StyleSheet, ImageBackground, Text, View } from "react-native";
import { Button } from "react-native-elements";
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
  isConnected,
  login,
}) {
  const [localPseudo, setLocalPseudo] = useState("");
  const [localMail, setLocalMail] = useState("");
  const [localPwd, setLocalPwd] = useState("");
  const [selection, setSelection] = useState("Sign-Up");

  useEffect(() => {
    //Récupération des données utilisateurs (pseudo, token) dans local storage et affectation au store à l'initialisation du composant
    AsyncStorage.getItem("user", (err, value) => {
      if (value) {
        value = JSON.parse(value);
        //Mise à jour des états pseudo & token dans le store
        onSubmitPseudo(value.pseudo);
        addToken(value.token);
        //Etat local userExist passé à true
        login();
      } else {
        console.log("Aucun utilisateur en local storage");
      }
    });
  }, []);

  //Vérification de l'existence d'un mood renseigné ce-jour pour l'utilisateur
  useEffect(() => {
    getDailyMood(token);
  }, [isConnected]);

  //Fonction pour récupérer les données de l'utilisateur pour vérifier si un mood a été renseigné ce-jour (appelée dans le useEffect)
  const getDailyMood = async (token) => {
    try {
      const rawResult = await fetch(`${proxy}/daily-mood/${token}`);
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
      console.log(err);
    }
  };

  //Fonction de création d'un utilisateur (BDD, Store et Local Storage)
  var handleSignup = async () => {
    try {
      // Envoi du pseudo du nouvel utilisateur vers le back pour l'enregistrer en BDD (récupération d'un toker depuis back)
      const data = await fetch(`${proxy}/sign-up`, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `username=${localPseudo}&email=${localMail}&password=${localPwd}`,
      });

      const body = await data.json();
      console.log("result :", body.result);
      let newPseudo = body.saveUser.username;
      let newToken = body.token;

      if (body.result === true) {
        // Ajout de l'utilisateur au store :
        onSubmitPseudo(newPseudo);
        addToken(newToken);
        // Ajout de l'utilisateur en local storage :
        AsyncStorage.setItem(
          "user",
          JSON.stringify({
            email: localMail,
            password: localPwd,
            pseudo: newPseudo,
            token: newToken,
          })
        );
        //Connexion
        login();
      }
    } catch (err) {
      console.log("something went wrong with sign-up process");
    }
  };

  //Fonction de connexion pour utilisateur déjà existant en BDD
  const handleSignIn = async () => {
    try {
      // Envoi du pseudo du nouvel utilisateur vers le back pour l'enregistrer en BDD (récupération d'un toker depuis back)
      const data = await fetch(`${proxy}/sign-in`, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `email=${localMail}&password=${localPwd}`,
      });

      const body = await data.json();
      console.log(body.msg);

      //Traitement en fonction du resultat de la reqûete : true -> connexion / false -> rien ne se passe (gestion & affichage des erreurs par la suite...)
      if (body.result === true) {
        const receivedPseudo = body.username;
        const receivedToken = body.token;
        // Ajout de l'utilisateur au store :
        onSubmitPseudo(receivedPseudo);
        addToken(receivedToken);
        // Ajout de l'utilisateur en local storage :
        AsyncStorage.setItem(
          "user",
          JSON.stringify({
            email: localMail,
            password: localPwd,
            pseudo: receivedPseudo,
            token: receivedToken,
          })
        );
        //Connexion
        login();
      } else {
        console.log("Echec connexion : email &/ou mot de passe incorrect(s) ");
      }
    } catch (err) {
      console.log("something went wrong with sign-in process");
    }
  };

  //Fonction envoyée en props dans composant SignBtn afin d'afficher le processus de connexion désiré : Sign-up vs Log-in
  const changeSelection = (option) => {
    setSelection(option);
  };

  //Fonctions envoyées en props dans composants SignUp & SignIn pour modifier les états locaux localPseudo, localMail, localPwd
  const handleLocalMail = (value) => {
    setLocalMail(value);
  };
  const handleLocalPseudo = (value) => {
    setLocalPseudo(value);
  };
  const handleLocalPwd = (value) => {
    setLocalPwd(value);
  };

  //Défition de l'affichage selon si les données de l'utilisateur sont enregistrées en localstorage ou non
  var isUserRegistered;
  if (isConnected === false) {
    //Si Non => Formulaire pour rentrer ses informations : Sign UP (Sign IN doit être ajouté)
    isUserRegistered = (
      <View style={styles.page}>
        <View style={styles.selectionContainer}>
          <SignBtn selection={selection} changeSelection={changeSelection} />
        </View>
        <View style={styles.connexionContainer}>
          {selection === "Sign-Up" ? (
            <SignUp
              handleLocalMail={handleLocalMail}
              handleLocalPseudo={handleLocalPseudo}
              handleLocalPwd={handleLocalPwd}
            />
          ) : (
            <SignIn
              handleLocalMail={handleLocalMail}
              handleLocalPwd={handleLocalPwd}
            />
          )}
        </View>
        <View style={styles.btnContainer}>
          <Button
            title="C'est parti !"
            type="solid"
            buttonStyle={{ backgroundColor: "#5B63AE" }}
            onPress={() => {
              selection === "Sign-Up" ? handleSignup() : handleSignIn();
            }}
          />
        </View>
      </View>
    );
  } else {
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
            setUserExist(false);
          }}
        />
      </View>
    );
  }

  return (
    <ImageBackground
      source={require("../assets/MoodzSignUp.png")}
      style={styles.container}
    >
      {isUserRegistered}
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
  page: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  selectionContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  connexionContainer: {
    flex: 1,
    padding: 20,
    marginTop: 10,
    marginBottom: 10,
  },
  btnContainer: {
    flex: 1,
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
    login: () => {
      dispatch({ type: "connexion" });
    },
  };
}

function mapStateToProps(state) {
  return {
    pseudo: state.pseudo,
    token: state.token,
    isConnected: state.isConnected,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
