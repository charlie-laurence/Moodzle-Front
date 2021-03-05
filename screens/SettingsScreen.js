import React from "react";
import { StyleSheet, Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button, Input } from "react-native-elements";
import { connect } from "react-redux";

function SettingsScreen({navigation, onSubmitPseudo, incrementStep}) {
  return (
    <View>
      <Text style={styles.paragraph}>SettingsScreen</Text>

      <Button
            title="Log Out"
            type="solid"
            buttonStyle={{ backgroundColor: "#5B63AE" }}
            onPress={() => {
              onSubmitPseudo('')
              incrementStep()
              AsyncStorage.clear();
              navigation.navigate("Home");
            }}
          />

    </View>
  );
}


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
    incrementStep: () => {
      dispatch({ type: "update-mood" });
    }
  };
}

function mapStateToProps(state) {
  return {
    pseudo: state.pseudo,
    token: state.token,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  paragraph: {
    fontWeight: "bold",
    fontSize: 30,
    textAlign: "center",
    color: "#009788",
    marginTop: 70,
  },
});
