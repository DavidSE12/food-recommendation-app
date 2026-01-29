import React , {useState, useEffect} from 'react';
import {View, Text, TextInput} from 'react-native';
import HomeScreen from './home';



const app = () => {
    return (
        <View style = {{flex : 1}}>
            <HomeScreen />
            
        </View>

//         <View>
//         <Text>Check</Text>
//         </View>
    )
}

export default app;