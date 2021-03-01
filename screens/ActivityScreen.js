import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, Dimensions } from "react-native";
import { Button } from "react-native-elements";
import { connect } from "react-redux";
import { FontAwesome5 } from "@expo/vector-icons";
import { categories } from "../statics/category";
import AsyncStorage from "@react-native-async-storage/async-storage";

function ActivityScreen({ selectMood, mood, incrementStep, step }) {
  const [activityList, setActivityList] = useState([]);

  useEffect(() => {
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
          const initialList = await AsyncStorage.setItem(
            "moodzle-activities",
            jsonInitialList
          );
          setActivityList([
            { category: "sport", name: "football" },
            { category: "social", name: "boire un verre" },
            { category: "culture", name: "cinema" },
            { category: "culture", name: "piano" },
            { category: "sport", name: "piscine" },
          ]);
        }
      } catch (err) {
        console.log(err);
      }
    };
    getActivityList();
  }, []);

  let activitiesBtn = [];
  if (activityList.length > 0) {
    activitiesBtn = activityList.map((activity) => (
      <Button
        key={activity.name}
        title={activity.name}
        buttonStyle={{ backgroundColor: categories[activity.category].color }}
      />
    ));
  }

  return (
    <View style={styles.container}>
      <View style={styles.btnContainer}>
        <Button title={"Retour"} onPress={() => console.log("retour")} />
        <Button title={"Ignorer"} />
      </View>
      <View style={styles.activityContainer}></View>
      <View style={styles.content}>{activitiesBtn}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    height: Dimensions.get("window").height,
  },
  btnContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    width: Dimensions.get("window").width,
    marginTop: 15,
    padding: 25,
  },
  activityContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: Dimensions.get("window").width,
    marginTop: 15,
    padding: 25,
  },
  content: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    width: Dimensions.get("window").width,
  },
});

const mapDispatchToProps = (dispatch) => {
  return {
    selectMood: (score) => {
      dispatch({ type: "select-mood", score });
    },
    incrementStep: () => {
      dispatch({ type: "next-step" });
    },
  };
};

const mapStateToProps = (state) => {
  return { mood: state.mood, step: state.step };
};

export default connect(mapStateToProps, mapDispatchToProps)(ActivityScreen);
