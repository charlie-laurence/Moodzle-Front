import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import { Button } from "react-native-elements";
import { connect } from "react-redux";
import { FontAwesome5 } from "@expo/vector-icons";
import {
  categories,
  initialActivityList,
} from "../statics/category&activities";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ModalNewActivity from "./Component/ModalNewActivity";
import ActivityBar from "./Component/ActivityBar";
import { proxy } from "../statics/ip";
import { limitDisplayedActivities } from "../statics/helper";
import ActivityCarousel from "./Component/ActivityCarousel";

function ActivityScreen({
  incrementStep,
  decrementStep,
  selectActivity,
  deselectActivity,
  activitySelection,
  mood,
  token,
  storedMoodId,
  sendMoodIdToStore,
}) {
  const [activityList, setActivityList] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    //1ère utilisation : Stockage en Local d'une liste initiale d'activités
    //Utilisations ultérieures : Récupération de la liste d'activités stockées en Local
    const getActivityList = async () => {
      try {
        const list = await AsyncStorage.getItem("moodzle-activities");
        if (list) {
          const parsedList = JSON.parse(list);
          let listToDisplay = limitDisplayedActivities(parsedList, 6);
          setActivityList(listToDisplay);
        } else {
          //Procédure pour ne pas afficher de doublon en cas de login (si signup, uniquement la liste de base est affichée)
          let activitiesToLoad = initialActivityList.map(
            (activity) => activity.name
          );
          let filteredSelection = activitySelection.filter(
            (activity) => !activitiesToLoad.includes(activity.name)
          );
          const jsonInitialList = JSON.stringify([
            ...initialActivityList,
            ...filteredSelection,
          ]);
          await AsyncStorage.setItem("moodzle-activities", jsonInitialList);
          let listToDisplay = limitDisplayedActivities(
            JSON.parse(jsonInitialList),
            6
          );
          setActivityList(listToDisplay);
        }
      } catch (err) {
        console.log(err);
      }
    };
    getActivityList();
  }, []);

  //Mise à jour liste des activités affichées (état local du composant ActivityScreen & LocalStorage)
  const updateLocalList = async (local) => {
    let currentActivityList = [...activityList];
    currentActivityList[currentActivityList.length - 1].length < 6
      ? currentActivityList[currentActivityList.length - 1].push(local)
      : currentActivityList.push([local]);
    //Etat local
    setActivityList([...currentActivityList]);
    //Local Storage
    const listToSendToLocalStorage = JSON.stringify(
      [...currentActivityList].reduce((a, b) => a.concat(b))
    );
    await AsyncStorage.setItem("moodzle-activities", listToSendToLocalStorage);
  };

  //Selection d'une activité (envoi dans le store)
  const handleActivityPress = (activity) => {
    activitySelection.filter((item) => item.name === activity.name).length === 0
      ? selectActivity(activity)
      : deselectActivity(activity);
  };

  //Valider - Ignorer Btn Press : Envoi en BDD et passage à l'étape suivante
  const handleSkipOrValidatePress = async () => {
    try {
      const rawResult = await fetch(`${proxy}/save-mood`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ storedMoodId, token, mood, activitySelection }),
      });
      const result = await rawResult.json();
      console.log(JSON.stringify(result));
      sendMoodIdToStore(result.moodId);
      incrementStep();
    } catch (err) {
      console.log(err);
    }
  };

  //Suppression de l'activité à la liste affichée (état local & local storage)
  const removeFromActivityList = async (activityToRemove) => {
    //Si activité sélectionnée, elle est retirée de la sélection
    activitySelection.filter((item) => item.name === activityToRemove.name)
      .length === 0
      ? null
      : deselectActivity(activityToRemove);
    let wholeList = [...activityList].reduce((a, b) => a.concat(b));
    let updatedList = wholeList.filter(
      (activity) => activity.name !== activityToRemove.name
    );
    //Etat Local
    setActivityList(limitDisplayedActivities(updatedList, 6));
    //Local Storage
    await AsyncStorage.setItem(
      "moodzle-activities",
      JSON.stringify(updatedList)
    );
  };

  const handleNewActivityPress = () => {
    toggleOverlay();
  };

  const toggleOverlay = () => {
    setModalVisible(!modalVisible);
  };

  //Génération des boutons d'activité (à partir de la liste récupérée en local storage)
  let activitiesBtnPages = [];
  if (activityList.length > 0) {
    for (let i = 0; i < activityList.length; i++) {
      const page = activityList[i].map((activity) => (
        <Button
          key={activity.name}
          title={activity.name}
          buttonStyle={{
            backgroundColor:
              activitySelection.filter((item) => item.name === activity.name)
                .length > 0
                ? categories[activity.category].color
                : "#57706D",
            marginTop: 20,
            borderRadius: 15,
          }}
          onPress={() => handleActivityPress(activity)}
          onLongPress={() => removeFromActivityList(activity)}
          selected={
            activitySelection.filter((item) => item.name === activity.name)
              .length > 0
              ? true
              : false
          }
        />
      ));
      activitiesBtnPages.push(page);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.topBtnContainer}>
        <Button
          buttonStyle={{
            backgroundColor: "#fff",
            borderRadius: 25,
            height: 50,
            width: 90,
            marginTop: 25,
          }}
          title={"Retour"}
          titleStyle={{ color: "#5B63AE" }}
          onPress={() => decrementStep()}
        />
      </View>
      <View style={styles.searchBarContainer}>
        <ActivityBar updateLocalList={updateLocalList} />
      </View>
      <View style={styles.carouselContainer}>
        <ActivityCarousel activities={activitiesBtnPages} />
      </View>
      <View style={styles.lower}>
        <View style={styles.newActivityContainer}>
          <FontAwesome5
            name="plus-circle"
            size={35}
            color="#DF8F4A"
            onPress={() => handleNewActivityPress()}
          />
          <Text style={styles.addActivityTxt}>
            Ajouter une nouvelle activité
          </Text>
        </View>
        <View style={styles.validateContainer}>
          <Button
            buttonStyle={{
              backgroundColor: "#fff",
              borderRadius: 25,
              height: 50,
              width: 100,
              marginTop: 25,
            }}
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
    backgroundColor: "#CEFFEB",
    alignItems: "center",
    justifyContent: "center",
    height: Dimensions.get("window").height,
  },
  topBtnContainer: {
    flex: 0.5,
    flexDirection: "row",
    justifyContent: "space-between",
    width: Dimensions.get("window").width,
    marginTop: 15,
    padding: 25,
  },
  searchBarContainer: {
    position: "absolute",
    top: 120,
    justifyContent: "center",
    alignItems: "center",
    width: Dimensions.get("window").width,
    backgroundColor: "transparent",
    zIndex: 1,
    maxHeight: (Dimensions.get("window").height * 70) / 100,
  },
  carouselContainer: {
    flex: 1,
    marginTop: 20,
  },
  lower: {
    flex: 1,
    justifyContent: "flex-start",
    width: Dimensions.get("window").width,
    paddingBottom: 25,
  },
  newActivityContainer: {
    flex: 1,
    // flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    // paddingLeft: 40,
    width: Dimensions.get("window").width,
    marginTop: 5,
  },
  addActivityTxt: {
    // marginLeft: 15,
    marginTop: 10,
    fontSize: 14,
    color: "#57706D",
  },
  validateContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingRight: 40,
    width: Dimensions.get("window").width,
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
    sendMoodIdToStore: (id) => {
      dispatch({ type: "store-moodId", id });
    },
  };
};

const mapStateToProps = (state) => {
  return {
    activitySelection: state.activitySelection,
    mood: state.mood,
    token: state.token,
    storedMoodId: state.storedMoodId,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ActivityScreen);
