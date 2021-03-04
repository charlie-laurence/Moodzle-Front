import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { connect } from "react-redux";


function ReactionScreen(props) {

const findFunFact = async () => {
  const dataFunFact = await fetch("http://172.17.1.15:3000/fun-fact", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `usernameFromFront=${props.pseudo}&token=${props.token}`,
  });
  const body = await dataFunFact.json();
}
findFunFact();

if(body.result === true){
  console.log("bodyFunFacts :", body)
}


  return (
    <View>
        <Text style={styles.paragraph}>ReactionScreen</Text>
        <Button
            title="OK REACTION"
            type="solid"
            buttonStyle = {{backgroundColor: "#009788"}}

            onPress={() => {
                            props.navigation.navigate('History');
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

function mapStateToProps(state) {
  return { pseudo: state.pseudo, mood: state.mood, token: state.token };
}

export default connect(
  mapStateToProps, null
  )
  (ReactionScreen);
