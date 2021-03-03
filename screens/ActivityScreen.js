import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";

export default function ActivityScreen(props) {
  return (
    <View>
         <Text style={styles.paragraph}>ActivityScreen</Text>
        <Button
            title="VALIDER ACTIVITÉ"
            type="solid"
            buttonStyle = {{backgroundColor: "#009788"}}

            onPress={() => {
                            props.navigation.navigate('Reaction');
        }}
        />
     
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