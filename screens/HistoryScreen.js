import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { connect } from "react-redux";

function HistoryScreen({ navigation, updateMood }) {
  return (
    <View>
      <Text style={styles.paragraph}>HistoryScreen</Text>
      <Text
        style={{
          textAlign: "center",
          fontSize: 20,
          fontWeight: "bold",
          marginTop: 35,
          marginBottom: 35,
        }}
      >
        Récupérer l'historique de BDD via Fetch
      </Text>
      <Button
        title="RETOUR SUR AJOUT MOOD"
        type="solid"
        buttonStyle={{ backgroundColor: "#009788" }}
        onPress={() => {
          updateMood();
        }}
      />
    </View>
  );
}

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

const mapDispatchToProps = (dispatch) => {
  return {
    updateMood: () => {
      dispatch({ type: "update-mood" });
    },
  };
};

const mapStateToProps = (state) => {
  return {
    activitySelection: state.activitySelection,
    mood: state.mood,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HistoryScreen);
