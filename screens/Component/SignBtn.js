import React, { useState } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { Input, Button } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";

const SignBtn = () => {
  const [selection, setSelection] = useState("SignUp");

  return (
    <View style={styles.btnContainer}>
      <Button title="SignUp" />
      <Button title="LogIn" />
    </View>
  );
};

const styles = StyleSheet.create({
  btnContainer: {
    flex: 0.5,
    flexDirection: "row",
    width: (Dimensions.get("window").width * 50) / 100,
    justifyContent: "center",
    alignItems: "flex-end",
  },
});

export default SignBtn;
