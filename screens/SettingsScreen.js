import React, {useState, useEffect} from "react";
import { StyleSheet, Text, View, Switch, TextInput } from "react-native";
import { ListItem, Overlay } from 'react-native-elements'
import { FontAwesome5 } from "@expo/vector-icons";
// import Collapsible from 'react-native-collapsible';
// import Accordion from 'react-native-collapsible/Accordion';
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

  const [switchDarkMode, setSwitchDarkMode] = useState(true);
  const [switchTextMode, setSwitchTextMode] = useState(false);
  const [switchMascotte, setSwitchMascotte] = useState(true);
  const [open, setOpen] = useState(true);
  const [overlayMentionsVisible, setOverlayMentionsVisible] = useState(false)
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


  const toggleSwitchDark = (value) => {
    //onValueChange of the switch this function will be called
    setSwitchDarkMode(value);
    //state changes according to switch
    //which will result in re-render the text
  };


  const toggleSwitchText = (value) => {
    //onValueChange of the switch this function will be called
    setSwitchTextMode(value);
    //state changes according to switch
    //which will result in re-render the text
  };

  const toggleSwitchMascotte = (value) => {
    //onValueChange of the switch this function will be called
    setSwitchMascotte(value);
    //state changes according to switch
    //which will result in re-render the text
  };

  const toggleOverlay = () => {
    setOverlayMentionsVisible(!overlayMentionsVisible);
  };

  const toggleOverlayPseudo = () => {
    setOverlayModifyPseudo(!overlayModifyPseudo);
  };

  const toggleOverlayPassword = () => {
    setOverlayModifyPassword(!overlayModifyPassword);
  };







  return (
    <View >
      <Text style={styles.paragraph}>SettingsScreen</Text>

      
      <ListItem bottomDivider>
        <ListItem.Content>
          <ListItem.Title>Profil</ListItem.Title>
         
          <ListItem.Subtitle>Username : {pseudoModified} </ListItem.Subtitle> 
          <Text style={{color:'#44B79D'}} onPress={toggleOverlayPseudo}>Modifier</Text>
     

     {/* Pop-up pour modifier pseudo */}
      <Overlay overlayStyle={{margin: 50}} isVisible={overlayModifyPseudo} onBackdropPress={toggleOverlayPseudo}children ={
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

     






          <ListItem.Subtitle>Mot de passe : ********</ListItem.Subtitle>
          <Text style={{color:'#44B79D'}} onPress={toggleOverlayPassword}>Modifier</Text>

    
     

     {/* Pop-up pour modifier mot de passe */}
      <Overlay overlayStyle={{margin: 50}} isVisible={overlayModifyPassword} onBackdropPress={toggleOverlayPassword} children= {
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
                    fetchData()
                 
                   }}
                 />
         </View>  
      }>
 

      </Overlay>


        </ListItem.Content>
        
        </ListItem>

        
          

 <ListItem bottomDivider>
      <ListItem.Title >Mode Nuit</ListItem.Title>
      
      <Switch
          style={{ marginTop: 0 }}
          onValueChange={toggleSwitchDark}
          value={switchDarkMode}
        />
      </ListItem>
    
      <ListItem bottomDivider>
      <ListItem.Title>Mode dyslexique</ListItem.Title>
      
      <Switch
          style={{ marginTop: 0 }}
          onValueChange={toggleSwitchText}
          value={switchTextMode}
        />

      </ListItem>

      <ListItem bottomDivider style={{display: 'flex',}}>
      <ListItem.Title>Mascotte</ListItem.Title>
      
      <Switch
          style={{ marginTop: 0, alignSelf: 'flex-end' }}
          onValueChange={toggleSwitchMascotte}
          value={switchMascotte}
        />

      </ListItem>


      {/* Pop-up Mentions légales  */}

<ListItem >
      <ListItem.Title style={{color:'#44B79D'}} onPress={toggleOverlay}  >Mentions Légales</ListItem.Title>
      <Overlay overlayStyle={{margin: 50}} isVisible={overlayMentionsVisible} onBackdropPress={toggleOverlay} children={ <View>  <Text style={{fontWeight: 'bold', marginBottom: 10, color:'#57706D'}}>Mentions légales</Text>
        <Text style={{color:'#57706D'}}>Appli hébergée chez Heroku et réalisée par Ze Best Team 3V3R !  </Text>
        </View>}>
       
       </Overlay>
      <ListItem.Title style={{color:'#44B79D'}}>Tutoriel</ListItem.Title>
  </ListItem>

      <Button
        title="Se déconnecter"
        type="solid"
        buttonStyle={{ backgroundColor: "#5B63AE" }}
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
    color: '#57706D',
    backgroundColor: "#CEFFEB",
  },
  paragraph: {
    fontWeight: "bold",
    fontSize: 30,
    textAlign: "center",
    color: "#009788",
    marginTop: 70,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen);

