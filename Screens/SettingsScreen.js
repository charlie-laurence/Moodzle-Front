import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function SettingsScreen(props) {
  return (
    <View>
        
      <Text style={styles.paragraph}>SettingsScreen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  paragraph: {
    fontWeight: "bold",
    fontSize: 30,
    textAlign: "center",
    color: "#009788",
    marginTop: 70
  },
});