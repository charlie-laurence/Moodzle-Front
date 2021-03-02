import React, { useState, useEffect } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { StyleSheet, ImageBackground, Text, View } from "react-native";

import { Button, Input } from "react-native-elements";

import { connect } from "react-redux";

function HomeScreen(props) {
  const [pseudo, setPseudo] = useState("");
  // console.log('pseudo :', pseudo);
  const [pseudoSubmited, setPseudoSubmited] = useState(false);
  // console.log('pseudo submited :', pseudoSubmited);
  // console.log('reduce pseudo :', props.pseudo)

  useEffect(() => {
      AsyncStorage.getItem('pseudo', (err, value) => {
        if (value) {
        setPseudo(value);
        props.onSubmitPseudo(pseudo);
        setPseudoSubmited(true);
        
      
      }
      });
  }, []);

var handleSubmitSignup = async () => {
  const data = await fetch('http://172.17.1.15:3000/sign-up', {
    method: 'POST',
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    body: `usernameFromFront=${pseudo}`
  })
}  





var inputUsername;
if (!pseudoSubmited) {
  inputUsername = <Input
  containerStyle={{ marginBottom: 25, width: '70%' }}
  inputStyle={{ marginLeft: 10 }}
  placeholder="Nom d'utilisateur"
  onChangeText={(content) => setPseudo(content)}
  />
  }  else {
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
            handleSubmitSignup();
            props.navigation.navigate("BottomNavigator", { screen: "Mood" });
          }}
        />

<Button
          title="Déconnexion !"
          type="solid"
          buttonStyle={{ backgroundColor: "#009788", marginTop: 10 }}
          onPress={() => {
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
      dispatch({ type: "savePseudo", pseudo: pseudo })
    }
  }
};

function mapStateToProps(state) {
  return { pseudo : state.pseudo, token: state.token };
};


export default connect(
  mapStateToProps, 
  mapDispatchToProps
  )(HomeScreen)
