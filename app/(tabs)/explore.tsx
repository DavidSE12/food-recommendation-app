import Map from '@/src/components/map';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

const explore = () => {

    const initialRegion = {
        latitude: 37.78825, // Initial latitude
        longitude: -122.4324, // Initial longitude
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    };

    return (
        <SafeAreaView>
                <Map  initialRegion={initialRegion}/>
        </SafeAreaView>
    )
}

export default explore;