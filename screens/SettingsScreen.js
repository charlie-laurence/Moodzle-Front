import React from "react";
import { StyleSheet, Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button } from "react-native-elements";
import { connect } from "react-redux";

function SettingsScreen({
  navigation,
  emptyPseudo,
  emptyToken,
  emptyActivities,
  reinitializeStep,
  logout,
}) {
  return (
    <View style={styles.container}>
      <Text style={styles.paragraph}>SettingsScreen</Text>

      <Button
        title="Log Out"
        type="solid"
        buttonStyle={{ backgroundColor: "#5B63AE" }}
        onPress={() => {
          //Vider Local Storage
          AsyncStorage.clear();
          //Vider Reducers : Pseudo, Token, Activités, Step (retour @1)
          emptyPseudo();
          emptyToken();
          emptyActivities();
          reinitializeStep();
          //Deconnexion
          logout();
          //Retour Page Home
          navigation.navigate("Home");
        }}
      />
    </View>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    emptyPseudo: (pseudo) => {
      dispatch({ type: "empty-pseudo" });
    },
    emptyToken: (token) => {
      dispatch({ type: "empty-token" });
    },
    emptyActivities: () => {
      dispatch({ type: "empty-selection" });
    },
    reinitializeStep: () => {
      dispatch({ type: "update-mood" });
    },
    logout: () => {
      dispatch({ type: "deconnexion" });
    },
  };
}

function mapStateToProps(state) {
  return {
    pseudo: state.pseudo,
    token: state.token,
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#CEFFEB",
  },
  paragraph: {
    fontWeight: "bold",
    fontSize: 30,
    textAlign: "center",
    color: "#009788",
    marginTop: 70,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen);

