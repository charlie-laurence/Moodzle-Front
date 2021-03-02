import React, {useState, useEffect} from "react";
import {TextInput} from "react-native";


export default function ActivityBar() {
    const [searchActivity , setSearchActivity] = useState(null);

    /* Interroger le backend pour récupérer la liste des activités au chargement de la page : */
    useEffect(async() => {
        var loadData = await fetch('http://172.17.1.158:3000/load-activities')
    }, []);


    return ( 
            <TextInput
                placeholder="Recherche une activité..."
                onChangeText={(value) => setSearchActivity(value)}
                value={searchActivity}
            />
    )
}
