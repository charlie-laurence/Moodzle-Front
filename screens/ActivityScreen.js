import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import { Button } from "react-native-elements";
import { connect } from "react-redux";
import { FontAwesome5 } from "@expo/vector-icons";
import { categories } from "../statics/category";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ModalNewActivity from "./Component/ModalNewActivity";
import ActivityBar from "./Component/ActivityBar";
import {_IP_CAPSULE} from "../statics/ip";

function ActivityScreen({
  incrementStep,
  decrementStep,
  selectActivity,
  deselectActivity,
  activitySelection,
  mood,
  //token
}) {
  const [activityList, setActivityList] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    //1ère utilisation : Stockage en Local d'une liste initiale d'activités
    //Utilisations ultérieures : Récupération de la liste d'activités stockées en Local
    const getActivityList = async () => {
      try {
        const list = await AsyncStorage.getItem("moodzle-activities");
        if (list !== null) {
          setActivityList(JSON.parse(list));
        } else {
          const jsonInitialList = JSON.stringify([
            { category: "sport", name: "football" },
            { category: "social", name: "boire un verre" },
            { category: "culture", name: "cinema" },
            { category: "culture", name: "piano" },
            { category: "sport", name: "piscine" },
          ]);
          await AsyncStorage.setItem("moodzle-activities", jsonInitialList);
          setActivityList(JSON.parse(jsonInitialList));
        }
      } catch (err) {
        console.log(err);
      }
    };
    getActivityList();
  }, []);

  const updateLocalList = (local) => {
    setActivityList([...activityList, local]);
  };

  const handleActivityPress = (activity) => {
    activitySelection.filter((item) => item.name === activity.name).length === 0
      ? selectActivity(activity)
      : deselectActivity(activity);
  };
  const handleSkipOrValidatePress = async () => {
    // envoi en BDD du mood de la journée (mood + activités)
    const rawResult = await fetch(`http://${_IP_CAPSULE}:3000/save-mood`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({mood, activitySelection}), //token }),
    });
    const result = await rawResult.json();
    console.log(result);
    incrementStep();
  };

  const handleNewActivityPress = () => {
    setModalVisible(!modalVisible);
  };

  const toggleOverlay = () => {
    setModalVisible(!modalVisible);
  };

  //Génération des boutons d'activité (à partir de la liste récupérée en local storage)
  let activitiesBtn = [];
  if (activityList.length > 0) {
    activitiesBtn = activityList.map((activity) => (
      <Button
        key={activity.name}
        title={activity.name}
        buttonStyle={{
          backgroundColor:
            activitySelection.filter((item) => item.name === activity.name)
              .length > 0
              ? categories[activity.category].color
              : "#57706D",
          marginBottom: 15,
        }}
        onPress={() => handleActivityPress(activity)}
        selected={
          activitySelection.filter((item) => item.name === activity.name)
            .length > 0
            ? true
            : false
        }
      />
    ));
  }

  return (
    <View style={styles.container}>
      <View style={styles.btnContainer}>
        <Button
          buttonStyle={{ backgroundColor: "#fff" }}
          title={"Retour"}
          titleStyle={{ color: "#5B63AE" }}
          onPress={() => decrementStep()}
        />
      </View>
      <View style={styles.searchBar}>
        <ActivityBar updateLocalList={updateLocalList} />
      </View>
      <View style={styles.activityWrapper}>
        <View style={styles.activityContainer}>{activitiesBtn}</View>
      </View>
      <View style={styles.lower}>
        <View style={styles.newActivityContainer}>
          <FontAwesome5
            name="plus-circle"
            size={30}
            color="#DF8F4A"
            onPress={() => handleNewActivityPress()}
          />
          <Text style={styles.addActivityTxt}>
            Ajouter une nouvelle activité
          </Text>
        </View>
        <View style={styles.validateContainer}>
          <Button
            buttonStyle={{ backgroundColor: "#fff" }}
            title={activitySelection.length > 0 ? "Valider" : "Ignorer"}
            titleStyle={{ color: "#5B63AE" }}
            onPress={() => handleSkipOrValidatePress()}
          />
        </View>
      </View>
      <ModalNewActivity
        visible={modalVisible}
        toggleOverlay={toggleOverlay}
        updateLocalList={updateLocalList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F0FFF9",
    alignItems: "center",
    justifyContent: "center",
    height: Dimensions.get("window").height,
  },
  btnContainer: {
    flex: 0.25,
    flexDirection: "row",
    justifyContent: "space-between",
    width: Dimensions.get("window").width,
    marginTop: 15,
    padding: 25,
  },
  activityWrapper: { flex: 1, justifyContent: "center", alignItems: "center" },
  activityContainer: {
    flex: 0.5,
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    width: Dimensions.get("window").width,
    marginTop: 15,
    padding: 25,
  },
  lower: {
    flex: 1,
    justifyContent: "flex-start",
    width: Dimensions.get("window").width,
    paddingBottom: 50,
  },
  searchBar: {
    flex: 0.5,
    justifyContent: "center",
    alignItems: "center",
    width: Dimensions.get("window").width,
  },
  newActivityContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 40,
    width: Dimensions.get("window").width,
  },
  validateContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingRight: 40,
    width: Dimensions.get("window").width,
  },
  addActivityTxt: {
    marginLeft: 15,
    fontSize: 16,
    color: "#57706D",
  },
});

const mapDispatchToProps = (dispatch) => {
  return {
    incrementStep: () => {
      dispatch({ type: "next-step" });
    },
    decrementStep: () => {
      dispatch({ type: "previous-step" });
    },
    selectActivity: (activity) => {
      dispatch({ type: "select", activity });
    },
    deselectActivity: (activity) => {
      dispatch({ type: "deselect", activity });
    },
  };
};

const mapStateToProps = (state) => {
  return {
    activitySelection: state.activitySelection,
    mood: state.mood,
    //token: state.token
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ActivityScreen);
