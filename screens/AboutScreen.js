import React from "react";
import { StyleSheet, ImageBackground, Text, View } from "react-native";
import { Button } from "react-native-elements";
import { connect } from "react-redux";


export default function AboutScreen(props) 
{

  return (
    <ImageBackground
      source={require("../assets/AboutScreen.png")}
      style={styles.container}
    >
        <Button
        title="Retour"
        type="solid"
        buttonStyle={{ 
            backgroundColor: "#5B63AE",
            marginTop: 720 }}
        onPress={() => {
          
          props.navigation.navigate("Settings");
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
    backgroundColor: "#CEFFEB",
  },
  btnContainer: {
    flex: 1,
    borderRadius: 50,
    height: 100,
    width: 150,
  },
});


