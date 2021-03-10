import React from "react";
import { StyleSheet, ImageBackground, Text, View } from "react-native";
import { Button } from "react-native-elements";


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
            marginTop: 720,
            borderRadius:15, 
            width:150, 
            height:50
        }}
        onPress={() => {
          
          props.navigation.navigate("BottomNavigator", { screen: "Settings" });
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
});


