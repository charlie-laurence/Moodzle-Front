import React, {useState, useEffect} from "react";
import {View, TextInput, ScrollView, Text} from "react-native";
import {ListItem} from "react-native-elements";


export default function ActivityBar() {
    const [searchActivity , setSearchActivity] = useState(null);
    const [activityFromBack , setActivityFromBack] = useState([]);

    /* Interroger le backend pour récupérer la liste des activités au chargement de la page : */
    useEffect(() => {
        async function fetchData() {
            var rawResponse = await fetch('http://172.17.1.158:3000/load-activities');
            var response = await rawResponse.json();
            setActivityFromBack(response);
        }
        fetchData();
    }, []);

    /* filtrer les résultats en fonction de la valeur du champs Input : */
    let filteredActivities = [];
    if (searchActivity) {
        filteredActivities = activityFromBack.filter(activity => {
        const regex = new RegExp(`^${searchActivity}`, "gi");
        return activity.name.match(regex);
        });
    }
    console.log(filteredActivities);

    //Afficher le résultat filtré sous forme de liste:
    let filteredListItem = filteredActivities.map((activity, i) =>{
        return (
            <ScrollView>
                <ListItem 
                key={i}
                onPress={() => handleActivityPress()}
                >
                    <Text>{activity.name}</Text>
                </ListItem>
            </ScrollView>
        )
    });

    return ( 
        <View>
            <TextInput
                placeholder="Recherche une activité..."
                onChangeText={(value) => setSearchActivity(value)}
                value={searchActivity}
            />
            {filteredListItem}
        </View>
    )
}
