import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  ScrollView,
  StyleSheet,
  Dimensions,
} from "react-native";
import { ListItem } from "react-native-elements";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { connect } from "react-redux";
import { proxy } from "../../statics/ip";
import { Ionicons } from "@expo/vector-icons";

function ActivityBar({ updateLocalList, selectActivity, activitySelection }) {
  const [searchActivity, setSearchActivity] = useState(null);
  const [activityFromBack, setActivityFromBack] = useState([]);

  /* Interroger le backend pour récupérer la liste des activités au chargement de la page : */
  useEffect(() => {
    async function fetchData() {
      try {
        var rawResponse = await fetch(`${proxy}/load-activities`);
        var response = await rawResponse.json();
        setActivityFromBack(response);
      } catch (err) {
        console.log("Erreur lors de la récupération des activités");
      }
    }
    fetchData();
  }, []);

  /* filtrer les résultats en fonction de la valeur du champs Input : */
  let filteredActivities = [];
  if (searchActivity) {
    filteredActivities = activityFromBack.filter((activity) => {
      const regex = new RegExp(`^${searchActivity}`, "gi");
      return activity.name.match(regex);
    });
  }

  //Afficher le résultat filtré sous forme de liste:
  let filteredListItem = filteredActivities.map((activity, i) => {
    return (
      <ListItem
        key={i}
        bottomDivider
        onPress={() => handleActivityPress(activity)}
      >
        <ListItem.Content>
          <ListItem.Title>{activity.name}</ListItem.Title>
        </ListItem.Content>
      </ListItem>
    );
  });

  //
  const handleActivityPress = async (existingActivity) => {
    try {
      const newActivityToBeAdded = {
        name: existingActivity.name,
        category: existingActivity.category,
      };
      let localList = await AsyncStorage.getItem("moodzle-activities");
      localList = JSON.parse(localList);
      if (localList.length > 0) {
        const filteredLocal = localList.filter(
          (activity) => activity.name === existingActivity.name
        );
        if (filteredLocal.length === 0) {
          await AsyncStorage.setItem(
            "moodzle-activities",
            JSON.stringify([...localList, newActivityToBeAdded])
          );
          updateLocalList(newActivityToBeAdded);
        }
        selectActivity(newActivityToBeAdded);
      }
      setSearchActivity("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View>
      <TextInput
        style={styles.textInput}
        placeholder="Rechercher une activité..."
        onChangeText={(value) => setSearchActivity(value)}
        value={searchActivity}
      />
      <ScrollView style={styles.listContainer}>{filteredListItem}</ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  textInput: {
    width: (Dimensions.get("window").width * 75) / 100,
    height: (Dimensions.get("window").height * 6) / 100,
    backgroundColor: "white",
    borderRadius: 15,
    marginTop: 30,
    paddingLeft: 15,
  },
  listContainer: {
    width: (Dimensions.get("window").width * 75) / 100,
    marginTop: 5,
    maxHeight: (Dimensions.get("window").height * 70) / 100,
    zIndex: 1,
  },
});

const mapDispatchToProps = (dispatch) => {
  return {
    selectActivity: (activity) => {
      dispatch({ type: "select", activity });
    },
  };
};

const mapStateToProps = (state) => {
  return {
    activitySelection: state.activitySelection,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ActivityBar);
