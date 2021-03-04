import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StyleSheet, ImageBackground, Text, View } from "react-native";
import { Button, Input } from "react-native-elements";
import { connect } from "react-redux";
import { _IP_CAPSULE } from "../statics/ip";

function HomeScreen({ navigation, pseudo, onSubmitPseudo, addToken }) {
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
  }, [userExist]);

  //Fonction de création d'un utilisateur (BDD, Store et Local Storage)
  var handleSubmitSignup = async () => {
    // Envoi du pseudo du nouvel utilisateur vers le back pour l'enregistrer en BDD (récupération d'un toker depuis back)
    const data = await fetch(`http://${_IP_CAPSULE}:3000/sign-up`, {
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
  };

  var isUserRegistered;
  if (userExist === false) {
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
        <Button
          title="Change user"
          type="solid"
          buttonStyle={{ backgroundColor: "#009788", marginTop: 10 }}
          onPress={() => {
            AsyncStorage.setItem("user", "");
            onSubmitPseudo("");
            addToken("");
            setUserExist(false);
          }}
        />
      </View>
    );
  } else if (userExist === true) {
    isUserRegistered = (
      <View>
        <Text style={styles.paragraph}>Bienvenue {pseudo}</Text>
        <Button
          title="Let's Go !"
          type="solid"
          buttonStyle={{ backgroundColor: "#009788" }}
          onPress={() => {
            navigation.navigate("BottomNavigator", { screen: "Mood" });
          }}
        />
        {/* <Button
          title="Change user"
          type="solid"
          buttonStyle={{ backgroundColor: "#009788", marginTop: 10 }}
          onPress={() => {
            AsyncStorage.setItem("user", "");
            onSubmitPseudo("");
            addToken("");
            setUserExist(false);
          }}
        /> */}
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
});

function mapDispatchToProps(dispatch) {
  return {
    onSubmitPseudo: function (pseudo) {
      dispatch({ type: "savePseudo", pseudo: pseudo });
    },
    addToken: function (token) {
      dispatch({ type: "addToken", token: token });
    },
  };
}

function mapStateToProps(state) {
  return { pseudo: state.pseudo };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
