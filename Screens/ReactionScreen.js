import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function ReactionScreen(props) {
  return (
    <View>
        <Button
            title="OK REACTION"
            type="solid"
            buttonStyle = {{backgroundColor: "#009788"}}

            onPress={() => {
                            props.navigation.navigate('BottomNavigator', { screen: 'HistoryScreen' });
        }}
        />
      <Text style={styles.paragraph}>ReactionScreen</Text>
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
  },
});