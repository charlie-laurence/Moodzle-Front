import React, { useState } from "react";
import { StyleSheet, Dimensions } from "react-native";
import { Button, Input, Overlay } from "react-native-elements";
import { Picker } from "@react-native-picker/picker";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ModalNewActivity = ({ visible, toggleOverlay, updateLocalList }) => {
  const [selectedCategory, setSelectedCategory] = useState("sport");
  const [newActivity, setNewActivity] = useState("");

  const handleValidatePress = async () => {
    try {
      const newActivityToBeAdded = {
        name: newActivity,
        category: selectedCategory,
      };
      //envoi en BDD de la nouvelle activité (nom, categorie)
      // await fetch("http://ip:3000/add-activity", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(newActivityToBeAdded),
      // });
      //envoi en local storage --> besoin d'une écoute sur le localstorage ou etat tampon pour mettre à jour la liste affichée

      let localList = await AsyncStorage.getItem("moodzle-activities");
      localList = JSON.parse(localList);
      if (localList.length > 0) {
        const filteredLocal = localList.filter(
          (activity) => activity.name === newActivity
        );
        filteredLocal.length === 0 &&
          (await AsyncStorage.setItem(
            "moodzle-activities",
            JSON.stringify([...localList, newActivityToBeAdded])
          ));
      }
      updateLocalList(newActivityToBeAdded);
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
    >
      <Input
        placeholder="Activité..."
        containerStyle={styles.inputBox}
        inputStyle={{ paddingTop: 10 }}
        value={newActivity}
        onChangeText={(value) => setNewActivity(value)}
      />
      <Picker
        selectedValue={selectedCategory}
        onValueChange={(itemValue, itemIndex) => setSelectedCategory(itemValue)}
      >
        <Picker.Item label="Sport" value="sport" />
        <Picker.Item label="Social" value="social" />
        <Picker.Item label="Culture" value="culture" />
      </Picker>
      <Button
        buttonStyle={{
          backgroundColor: "#5B63AE",
          width: "90%",
          marginLeft: "auto",
          marginRight: "auto",
        }}
        title={"Ajouter"}
        titleStyle={{ color: "#fff" }}
        onPress={() => handleValidatePress()}
      />
    </Overlay>
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

export { ModalNewActivity };
