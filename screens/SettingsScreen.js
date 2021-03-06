import React, {useState} from "react";
import { StyleSheet, Text, View, Switch } from "react-native";
import { ListItem, Overlay } from 'react-native-elements'
import { FontAwesome5 } from "@expo/vector-icons";
// import Collapsible from 'react-native-collapsible';
// import Accordion from 'react-native-collapsible/Accordion';


export default function SettingsScreen(props) {

  const [switchDarkMode, setSwitchDarkMode] = useState(true);
  const [switchTextMode, setSwitchTextMode] = useState(false);
  const [switchMascotte, setSwitchMascotte] = useState(true);
  const [open, setOpen] = React.useState(true);
  const [overlayMentionsVisible, setOverlayMentionsVisible] = useState(false)

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

  //Pop-up Mentions légales 

  return (
    <View>
      <Text style={styles.paragraph}>SettingsScreen</Text>

      
      <ListItem bottomDivider>
        {/* <Icon name={item.icon} /> */}
        <ListItem.Content>
          <ListItem.Title>Profil</ListItem.Title>
          <ListItem.Subtitle>Username : Lulu</ListItem.Subtitle>
          <ListItem.Subtitle>Mot de passe : ********</ListItem.Subtitle>
          <ListItem.Subtitle>token : ********</ListItem.Subtitle>


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


      <ListItem bottomDivider
      button onClick={handleClick}
      >
 <FontAwesome5
      key={122}
      name={'chevron-up'}
      size={18}
    
    />       
        <ListItem.Title>Coucou</ListItem.Title>
       {open ? <FontAwesome5
      key={124}
      name={'chevron-up'}
      size={18}
    
    />  : <FontAwesome5
    key={123}
    name={'chevron-down'}
    size={18}
  
  /> } 
      </ListItem  >

<ListItem >
      <ListItem.Title style={{color:'#44B79D'}} onPress={toggleOverlay}  >Mentions Légales</ListItem.Title>
      <Overlay overlayStyle={{margin: 50}} isVisible={overlayMentionsVisible} onBackdropPress={toggleOverlay}>
        <Text style={{fontWeight: 'bold', marginBottom: 10, color:'#57706D'}}>Mentions légales</Text>
        <Text style={{color:'#57706D'}}>Appli hébergée chez Heroku et réalisée par the Best Tem 3V3R !  </Text>
      </Overlay>
      <ListItem.Title style={{color:'#44B79D'}}>A propos</ListItem.Title>
  </ListItem>

    </View>


// profil, paramètres, mentions légales, à propos

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    color: '#57706D'
  },
  paragraph: {
    fontWeight: "bold",
    fontSize: 30,
    textAlign: "center",
    color: "#009788",
    marginTop: 70,
  },
});
