import React, { useState } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { Button, Input, Overlay } from "react-native-elements";
import { Picker } from "@react-native-picker/picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { proxy } from "../../statics/ip";
import { connect } from "react-redux";

const ModalNewActivity = ({
  visible,
  toggleOverlay,
  updateLocalList,
  selectActivity,
}) => {
  const [selectedCategory, setSelectedCategory] = useState("sport");
  const [newActivity, setNewActivity] = useState("");

  const handleValidatePress = async () => {
    try {
      const newActivityToBeAdded = {
        name: newActivity,
        category: selectedCategory,
      };
      // Envoi en BDD de la nouvelle activité (nom, categorie)
      const rawResult = await fetch(`${proxy}/add-activity`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newActivityToBeAdded),
      });
      const result = await rawResult.json();
      // Envoi en local storage
      let localList = await AsyncStorage.getItem("moodzle-activities");
      localList = JSON.parse(localList);
      if (localList.length > 0) {
        const filteredLocal = localList.filter(
          (activity) => activity.name === newActivityToBeAdded.name
        );
        if (filteredLocal.length === 0) {
          await AsyncStorage.setItem(
            "moodzle-activities",
            JSON.stringify([...localList, newActivityToBeAdded])
          );
          updateLocalList(newActivityToBeAdded);
        }
      }
      selectActivity(newActivityToBeAdded);
      setNewActivity("");
      toggleOverlay();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Overlay
      isVisible={visible}
      onBackdropPress={toggleOverlay}
      overlayStyle={styles.overlay}
      children={
        <View>
          <Input
            placeholder="Activité..."
            containerStyle={styles.inputBox}
            inputStyle={{ paddingTop: 10 }}
            value={newActivity}
            onChangeText={(value) => setNewActivity(value)}
          />
          <Picker
            selectedValue={selectedCategory}
            onValueChange={(itemValue) => setSelectedCategory(itemValue)}
          >
            <Picker.Item label="Sport" value="sport" />
            <Picker.Item label="Social" value="social" />
            <Picker.Item label="Culture" value="culture" />
          </Picker>
          <Button
            buttonStyle={{
              backgroundColor: "#DF8F4A",
              width: "90%",
              marginLeft: "auto",
              marginRight: "auto",
            }}
            title={"Ajouter"}
            titleStyle={{ color: "#fff" }}
            onPress={() => handleValidatePress()}
          />
        </View>
      }
    />
  );
};

const styles = StyleSheet.create({
  overlay: {
    width: (Dimensions.get("window").width * 75) / 100,
    height: (Dimensions.get("window").height * 50) / 100,
    justifyContent: "center",
  },
  inputBox: {
    backgroundColor: "#E8E8E8",
    borderRadius: 8,
  },
});

const mapDispatchToProps = (dispatch) => {
  return {
    selectActivity: (activity) => {
      dispatch({ type: "select", activity });
    },
  };
};

export default connect(null, mapDispatchToProps)(ModalNewActivity);
