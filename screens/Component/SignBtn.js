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
        title="Sign-Up"
        titleStyle={
          selection === "Sign-Up" ? styles.txtSelected : styles.txtUnselected
        }
        onPress={() => handleOptionPress("Sign-Up")}
        buttonStyle={
          selection === "Sign-Up" ? styles.selected : styles.unselected
        }
      />
      <Button
        title="Log-In"
        titleStyle={
          selection === "Log-In" ? styles.txtSelected : styles.txtUnselected
        }
        onPress={() => handleOptionPress("Log-In")}
        buttonStyle={
          selection === "Log-In" ? styles.selected : styles.unselected
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  btnContainer: {
    flex: 1,
    flexDirection: "row",
    width: (Dimensions.get("window").width * 50) / 100,
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  selected: {
    backgroundColor: "#5B63AE",
    borderRadius: 50,
    height: 50,
    width : 100
  },
  unselected: {
    backgroundColor: "#fff",
    borderRadius: 50,
    height: 50,
    width : 100
  },
  txtSelected: {
    color: "#fff",
  },
  txtUnselected: {
    color: "#5B63AE",
  },
});

export default SignBtn;
