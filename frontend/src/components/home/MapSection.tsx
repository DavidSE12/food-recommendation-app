import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Map from '@/src/components/map';


export default function MapSection() {

//    const initialRegion = {
//        latitude: 40.78825, // Initial latitude
//        longitude: -122.4324, // Initial longitude
//        latitudeDelta: 0.0922,
//        longitudeDelta: 0.0421,
//       };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.sectionTitle}>Near you</Text>
      </View>

      <View style={styles.mapSection}>
            {/* <Map /> */}
            <Text>Show map here</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  mapSection: {
    width: '100%',
    height: 250,
    borderRadius: 16,
    backgroundColor: '#b2ffa9d0',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
