import React, {useState} from "react";
import { StyleSheet, Text, View, Dimensions, TextInput } from "react-native";
import { ListItem, Overlay } from 'react-native-elements'
import { FontAwesome5 } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button } from "react-native-elements";
import { connect } from "react-redux";
import { proxy } from "../statics/ip";


function SettingsScreen({
  navigation,
  emptyPseudo,
  emptyToken,
  emptyActivities,
  reinitializeStep,
  logout,
  pseudo,
  modifyPseudo,
  token
}) 
{

  const [open, setOpen] = useState(true);
  const [overlayModifyPseudo, setOverlayModifyPseudo] = useState(false)
  const [pseudoModified, setPseudoModified] = useState(pseudo)
  const [overlayModifyPassword, setOverlayModifyPassword] = useState(false)

  const [actualPassword, setActualPassword] = useState('')
  const [passwordModified, setPasswordModified] = useState('')
  const [confirmPasswordModified, setConfirmPasswordModified] = useState('')


  var fetchData = async() => await fetch(`${proxy}/modifications`, {
    method: 'PUT',
    headers: {'Content-Type':'application/x-www-form-urlencoded'},
    body: `username=${pseudoModified}&actualPassword=${actualPassword}&newPassword=${passwordModified}&confirmedPassword=${confirmPasswordModified}&token=${token}`
  });



  const handleClick = () => {
    setOpen(!open);
  };

  const toggleOverlayPseudo = () => {
    setOverlayModifyPseudo(!overlayModifyPseudo);
  };

  const toggleOverlayPassword = () => {
    setOverlayModifyPassword(!overlayModifyPassword);
  };


  return (
    <View style={styles.container}>
      <ListItem style={styles.profil}>
        <ListItem.Content>
          <ListItem.Title style={{marginBottom:25, fontSize:25}}>Profil</ListItem.Title>
          <ListItem.Subtitle style={{marginBottom:10, fontSize:20}}>Pseudo : {pseudoModified} </ListItem.Subtitle> 
          <Text style={{color:'#44B79D', marginBottom:20 , fontSize:20}} onPress={toggleOverlayPseudo}>Modifier</Text>

          {/* Pop-up pour modifier pseudo */}
          <Overlay overlayStyle={styles.overlay} isVisible={overlayModifyPseudo} onBackdropPress={toggleOverlayPseudo}children ={
            <View>
              <TextInput
                style={styles.textInput}
                placeholder="Nouveau pseudo"
                onChangeText={(value) => setPseudoModified(value)}
                value={pseudoModified}
              />
              <Button
                title="Confirmer"
                type="solid"
                buttonStyle={{ backgroundColor: "#009788" }}
                onPress={() => {
                  modifyPseudo(pseudoModified)
                  toggleOverlayPseudo()
                  fetchData()
                }}
              />
            </View>
          }>
          </Overlay>

          <ListItem.Subtitle style={{marginBottom:10, fontSize:20}}>Mot de passe : ********</ListItem.Subtitle>
          <Text style={{color:'#44B79D', marginBottom:15, fontSize:20}} onPress={toggleOverlayPassword}>Modifier</Text>
          {/* Pop-up pour modifier mot de passe */}
          <Overlay overlayStyle={styles.overlay} isVisible={overlayModifyPassword} onBackdropPress={toggleOverlayPassword} children= {
            <View>
              <TextInput
                style={styles.textInput}
                placeholder="Actuel mot de passe"
                onChangeText={(value) => setActualPassword(value)}
                value={actualPassword}
              />
              <TextInput
                style={styles.textInput}
                placeholder="Nouveau mot de passe"
                onChangeText={(value) => setPasswordModified(value)}
                value={passwordModified}
              />
              <TextInput
                style={styles.textInput}
                placeholder="Confirmer nouveau mot de passe"
                onChangeText={(value) => setConfirmPasswordModified(value)}
                value={confirmPasswordModified}
              />
              <Button
                  title="Confirmer"
                  type="solid"
                  buttonStyle={{ backgroundColor: "#009788" }}
                  onPress={(value) => {
                    toggleOverlayPassword()                  
              }}/>
            </View>  
          }>
          </Overlay>
        </ListItem.Content>
      </ListItem>

      {/* Bouton mentions légales et à propos (step) */}
      <Button
        title="À propos"
        type="solid"
        buttonStyle={{backgroundColor: "#5B63AE", marginBottom:25, borderRadius:15, width:200, height:55}}
      >
      </Button>
      <Button
        title="Mentions Légales"
        type="solid"
        buttonStyle={{backgroundColor: "#5B63AE", marginBottom:25, borderRadius:15, width:200, height:55}}
      >
      </Button>
      {/* Bouton déconnexion */}
      <Button
        title="Se déconnecter"
        type="solid"
        buttonStyle={{ backgroundColor: "#CD6133", marginTop: 80, marginBottom:25, borderRadius:15, width: (Dimensions.get("window").width * 70) / 100, height:55 }}
        onPress={() => {
          //Vider Local Storage
          AsyncStorage.clear();
          //Vider Reducers : Pseudo, Token, Activités, Step (retour @1)
          emptyPseudo();
          emptyToken();
          emptyActivities();
          reinitializeStep();
          //Deconnexion
          logout();
          //Retour Page Home
          navigation.navigate("Home");
        }}
      />
    </View>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    emptyPseudo: (pseudo) => {
      dispatch({ type: "empty-pseudo" });
    },
    emptyToken: (token) => {
      dispatch({ type: "empty-token" });
    },
    emptyActivities: () => {
      dispatch({ type: "empty-selection" });
    },
    reinitializeStep: () => {
      dispatch({ type: "update-mood" });
    },
    logout: () => {
      dispatch({ type: "deconnexion" });
    },
    modifyPseudo: (newPseudo) => {

      dispatch({ type: "modify-pseudo", newPseudo });
    },
  };
}

function mapStateToProps(state) {
  return {
    pseudo: state.pseudo,
    token: state.token,
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    paddingTop: 80,
    color: '#57706D',
    backgroundColor: "#CEFFEB",
  },
  profil: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginBottom: 50,
  },
  overlay: {
    width: (Dimensions.get("window").width * 70) / 100,
    height: (Dimensions.get("window").height * 30) / 100,
    justifyContent: "center",
    alignItems: "center",
  },
  textInput: {
    justifyContent: "center",
    marginBottom:25
  },
  logout: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen);

