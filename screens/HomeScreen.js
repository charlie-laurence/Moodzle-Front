import React, { useState } from 'react';

import { StyleSheet, ImageBackground, Text, View } from 'react-native';

import {Button, Input} from 'react-native-elements';

import { connect } from 'react-redux';


function HomeScreen(props) {

const [pseudo, setPseudo] = useState('');
console.log(pseudo)

    return (
        <ImageBackground source={require('../assets/MoodzSignUp.png')} style={styles.container}>
        
            <Input
            containerStyle = {{marginBottom: 25, width: '70%'}}
            inputStyle={{marginLeft: 10}}
            placeholder="Nom d'utilisateur"
            onChangeText={(e) => setPseudo(e)}
            />          
        <Button
            title="C'est parti !"
            type="solid"
            buttonStyle = {{backgroundColor: "#009788"}}

            onPress={() => { props.onSubmitPseudo(pseudo); 
                            props.navigation.navigate('BottomNavigator', { screen: 'Mood' });
        }}
        />

        

        </ImageBackground>
);
    }
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      },
    });



    function mapDispatchToProps(dispatch) {
      return {
        onSubmitPseudo: function(pseudo) {
           dispatch( {type: 'savePseudo', pseudo: pseudo })
        }
      }
     }

     export default connect(
      null,
      mapDispatchToProps
     )(HomeScreen);

    