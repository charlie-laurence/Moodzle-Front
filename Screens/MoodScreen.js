import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";

// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';

// import ActivityScreen from './ActivityScreen';

export default function MoodScreen(props) {
  return (
    <View>
        <Text style={styles.paragraph}>MoodScreen</Text>
        <Button
            title="VALIDER MOOD"
            type="solid"
            buttonStyle = {{backgroundColor: "#009788"}}

            onPress={() => {
                            props.navigation.navigate('Activity');
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
