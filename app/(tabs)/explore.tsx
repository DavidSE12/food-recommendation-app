import Map from '@/src/components/map';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {Text} from 'react-native';


const explore = () => {

    const initialRegion = {
        latitude: -37.8136, // Initial latitude
        longitude: 144.9631, // Initial longitude
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    };

    return (
        <SafeAreaView style = {{ flex : 1 }}>
                {/* <Map  /> */}
                <Text>Show map here</Text>
        </SafeAreaView>
    )
}

export default explore;