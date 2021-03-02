import React, { useState, useEffect } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { StyleSheet, ImageBackground, Text, View } from "react-native";

import { Button, Input } from "react-native-elements";

import { connect } from "react-redux";

function HomeScreen(props) {

/* 
- récupération de la valeur depuis l'input et mise à jour de l'état pseudo
- initialisation d'un état pseudoSubmited à false pour gérer la différence 
d'affichage entre un utilisateur déjà enregistré et un nouvel utilisateur
*/

  const [pseudo, setPseudo] = useState("");
  const [pseudoSubmited, setPseudoSubmited] = useState(false);

  const [userExist, setUserExist] = useState(false);


/* 
- enregistrement du pseudo dans le local storage
*/  
  useEffect(() => {
    AsyncStorage.getItem("pseudo", (err, value) => {
      if (value) {
        setPseudo(value);
        props.onSubmitPseudo(value);
        setPseudoSubmited(true);
      }
    });
  }, []);

/* 
- envoi du pseudo du nouvel utilisateur vers le back pour l'enregistrer en BDD
*/
  var handleSubmitSignup = async () => {
    const data = await fetch("http://172.17.1.15:3000/sign-up", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `usernameFromFront=${props.pseudo}&token=${props.token}`,
    });

  const body = await data.json()
  console.log("result :", body.result)

  
  if(body.result === true){
    props.addToken(body.token);
    setUserExist(true);
    console.log("token :", body.token)
    console.log('username :', body.saveUser.username)
    console.log("allinfo :", body)

  }
  };


  var inputUsername;
  if (!pseudoSubmited) {
    inputUsername = (
      <Input
        containerStyle={{ marginBottom: 25, width: "70%" }}
        inputStyle={{ marginLeft: 10 }}
        placeholder="Nom d'utilisateur"
        onChangeText={(content) => setPseudo(content)}
      />
    );
  } else {
    inputUsername = <Text style={styles.paragraph}>Bienvenue {props.pseudo} !</Text>;
  }

  return (
    <ImageBackground
      source={require("../assets/MoodzSignUp.png")}
      style={styles.container}
    >
      {inputUsername}

      <Button
        title="C'est parti !"
        type="solid"
        buttonStyle={{ backgroundColor: "#009788" }}
        onPress={() => {
          setPseudoSubmited(true);
          props.onSubmitPseudo(pseudo);
          AsyncStorage.setItem("pseudo", pseudo);
          handleSubmitSignup();
          props.navigation.navigate("BottomNavigator", { screen: "Mood" });
        }}
      />

      <Button
        title="Déconnexion"
        type="solid"
        buttonStyle={{ backgroundColor: "#009788", marginTop: 10 }}
        onPress={() => {
          AsyncStorage.setItem("pseudo", "");
          setPseudoSubmited(false);
        }}
      />
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
    onSubmitPseudo: function(pseudo) {
      dispatch({ type: "savePseudo", pseudo: pseudo })
      },
    addToken: function(token) {
      dispatch({ type: "addToken", token: token})
    } 
  };
}

function mapStateToProps(state) {
  return { pseudo: state.pseudo, token: state.token };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
