import React, { useState, useEffect } from "react";

<<<<<<< HEAD
import { StyleSheet, ImageBackground, Text, View } from 'react-native';
import {Button, Input} from 'react-native-elements'
=======
import AsyncStorage from "@react-native-async-storage/async-storage";

import { StyleSheet, ImageBackground, Text, View } from "react-native";
>>>>>>> f502c3ceebe86fcce1116bddffa05ebbb94ea1ca

import { Button, Input } from "react-native-elements";

import { connect } from "react-redux";

function HomeScreen(props) {

<<<<<<< HEAD
export default function HomeScreen(props) {
    return (
        <ImageBackground source={require('../assets/moodz.png')} style={styles.container}>
            <Input
            containerStyle = {{marginBottom: 25, width: '70%'}}
            inputStyle={{marginLeft: 10}}
            placeholder='USERNAME'
            />          
        <Button
            title="LET'S GO"
            type="solid"
            buttonStyle = {{backgroundColor: "#009788"}}
=======
/* 
- récupération de la valeur depuis l'input et mise à jour de l'état pseudo
- initialisation d'un état pseudoSubmited à false pour gérer la différence 
d'affichage entre un utilisateur déjà enregistré et un nouvel utilisateur
*/
>>>>>>> f502c3ceebe86fcce1116bddffa05ebbb94ea1ca

  const [pseudo, setPseudo] = useState("");
  const [userExist, setUserExist] = useState(false);


/* 
- enregistrement du pseudo dans le local storage
*/  
  useEffect(() => {
    AsyncStorage.getItem("pseudo", (err, value) => {
      if (value) {
        setPseudo(value);
        props.onSubmitPseudo(value);
        setUserExist(true);
      }
    });
  }, [userExist]);

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

  var isUserRegistered;
  if (userExist === false) {
    isUserRegistered = (
      <View>
      <Input
        containerStyle={{ marginBottom: 25, width: 200 }}
        inputStyle={{ marginLeft: 10 }}
        placeholder="Nom d'utilisateur"
        onChangeText={(content) => {
          setPseudo(content);
          AsyncStorage.setItem("pseudo", content);
          props.onSubmitPseudo(content)
        }}
      />
      <Button
        title="C'est parti !"
        type="solid"
        buttonStyle={{ backgroundColor: "#009788" }}
        onPress={() => {
          props.onSubmitPseudo(pseudo);
          AsyncStorage.setItem("pseudo", pseudo);
          handleSubmitSignup();
          props.navigation.navigate("BottomNavigator", { screen: "Mood" });
        }}
<<<<<<< HEAD
        />
        </ImageBackground>
);
    }
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
=======
      />
      <Button
        title="Change user"
        type="solid"
        buttonStyle={{ backgroundColor: "#009788", marginTop: 10 }}
        onPress={() => {
          AsyncStorage.setItem("pseudo", "");
          props.onSubmitPseudo("");
          setUserExist(false);
        }}
      />
      </View>
    );
  } else if(userExist === true){
    isUserRegistered = (
      <View>
      <Text style={styles.paragraph}>Bienvenue {props.pseudo}</Text>
      <Button
        title="Let's Go !"
        type="solid"
        buttonStyle={{ backgroundColor: "#009788" }}
        onPress={() => {
          props.navigation.navigate("BottomNavigator", { screen: "Mood" });
        }}
      />
      <Button
        title="Change user"
        type="solid"
        buttonStyle={{ backgroundColor: "#009788", marginTop: 10 }}
        onPress={() => {
          AsyncStorage.setItem("pseudo", "");
          setUserExist(false);
          props.onSubmitPseudo("");
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
});

function mapDispatchToProps(dispatch) {
  return {
    onSubmitPseudo: function(pseudo) {
      dispatch({ type: "savePseudo", pseudo: pseudo })
>>>>>>> f502c3ceebe86fcce1116bddffa05ebbb94ea1ca
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
