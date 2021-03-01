import React, { useState, useEffect } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { StyleSheet, ImageBackground, Text, View } from "react-native";

import { Button, Input } from "react-native-elements";

import { connect } from "react-redux";

function HomeScreen(props) {
  const [pseudo, setPseudo] = useState("");
  console.log('pseudo', pseudo);
  const [pseudoSubmited, setPseudoSubmited] = useState(false);

  useEffect(() => {
      AsyncStorage.getItem("pseudo", (err, value) => {
        if (value) {
        setPseudo(value);
        setPseudoSubmited(true);
        }
      });
  }, []);


var inputUsername;
if (!pseudoSubmited) {
  inputUsername = <Input
  containerStyle={{ marginBottom: 25, width: '70%' }}
  inputStyle={{ marginLeft: 10 }}
  placeholder="Nom d'utilisateur"
  onChangeText={(content) => setPseudo(content)}
  />
  } else {
    inputUsername = <Text style={styles.paragraph}>Bienvenue {pseudo} !</Text>
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
            props.navigation.navigate("BottomNavigator", { screen: "Mood" });
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
    fontWeight: 'normal',
    fontSize: 25,
    textAlign: 'center',
    color: 'black', 
    marginBottom: 20,
},
});

function mapDispatchToProps(dispatch) {
  return {
    onSubmitPseudo: function (pseudo) {
      dispatch({ type: "savePseudo", pseudo: pseudo });
    },
  };
}

export default connect(
  null, 
  mapDispatchToProps
  )(HomeScreen);
