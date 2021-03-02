import React, { useState } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { Button, Input, Overlay } from "react-native-elements";
import { Picker } from "@react-native-picker/picker";

const ModalNewActivity = ({ visible, toggleOverlay }) => {
  const [selectedLanguage, setSelectedLanguage] = useState();
  const [newActivity, setNewActivity] = useState("");

  const handleValidatePress = () => {
    //envoi en BDD de la nouvelle activité (nom, categorie)
    //envoi en local storage --> besoin d'une écoute sur le localstorage ou etat tampon pour mettre à jour la liste affichée
    setNewActivity("");
    toggleOverlay();
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
        selectedValue={selectedLanguage}
        onValueChange={(itemValue, itemIndex) => setSelectedLanguage(itemValue)}
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
