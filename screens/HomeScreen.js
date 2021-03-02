import React from 'react';
import ActivityBar from '../components/ActivityBar';

import { StyleSheet, ImageBackground, Text, View } from 'react-native';
import {Button, Input} from 'react-native-elements'

import Icon from 'react-native-vector-icons/FontAwesome';



export default function HomeScreen(props) {
    return (
        <ImageBackground source={require('../assets/moodz.png')} style={styles.container}>
            <Input
            containerStyle = {{marginBottom: 25, width: '70%'}}
            inputStyle={{marginLeft: 10}}
            placeholder='USERNAME'
            />          
        <Button
            title="LET'S GO"
            type="solid"
            buttonStyle = {{backgroundColor: "#009788"}}

            onPress={() => {
                            props.navigation.navigate('BottomNavigator', { screen: 'Mood' });
        }}
        />
        <ActivityBar/>
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

    