import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { Button } from "react-native-elements";

const SignBtn = ({ selection, changeSelection }) => {
  const handleOptionPress = (option) => {
    changeSelection(option);
  };
  return (
    <View style={styles.btnContainer}>
      <Button
        title="S'inscrire"
        titleStyle={
          selection === "S'inscrire" ? styles.txtSelected : styles.txtUnselected
        }
        onPress={() => handleOptionPress("S'inscrire")}
        buttonStyle={
          selection === "S'inscrire" ? styles.selected : styles.unselected
        }
      />
      <Button
        title="Se connecter"
        titleStyle={
          selection === "Se connecter" ? styles.txtSelected : styles.txtUnselected
        }
        onPress={() => handleOptionPress("Se connecter")}
        buttonStyle={
          selection === "Se connecter" ? styles.selected : styles.unselected
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  btnContainer: {
    flex: 1,
    flexDirection: "row",
    width: (Dimensions.get("window").width * 70) / 100,
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  selected: {
    backgroundColor: "#5B63AE",
    borderRadius: 50,
    height: 50,
    width : 140
  },
  unselected: {
    backgroundColor: "#fff",
    borderRadius: 50,
    height: 50,
    width : 140
  },
  txtSelected: {
    color: "#fff",
  },
  txtUnselected: {
    color: "#5B63AE",
  },
});

export default SignBtn;
