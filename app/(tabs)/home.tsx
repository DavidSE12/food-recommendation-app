import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import SearchBar from '@/src/components/Search';

import {
  View,
  Text,
  StyleSheet,
  Image,
  StatusBar,
  TouchableOpacity,
} from 'react-native';



const HomeScreen = () => {
  return (
    <LinearGradient
      colors={['#FFFFFF', '#FFFFFF', '#FFE9C7']}
      locations={[0.46, 0.63, 1]}
      start={{ x: 0.85, y: 0.05 }}
      end={{ x: 0.15, y: 0.95 }}
      style={{ flex: 1 }}
    >
    <SafeAreaView>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <View style={styles.container}>
        {/* Left side - Greeting and message*/}
        <View style={styles.centerContent}>
          <Text style={{fontSize: 14, color: '#666', marginBottom: 2}}>Hello, dat</Text>
          <Text style={{fontSize: 25, color: '#000', fontWeight : "bold"}}>What to eat today?</Text>
        </View>


        {/* Right side - Profile icon */}
        <View>
            <Image
            source={require('@/assets/images/profile.jpg')}
            style={styles.profileIcon}
            />
        </View>
       </View>

       {/* Search Bar */}
       <View>
            <SearchBar />
       </View>


       {/* Main Page */}

       <View style = {styles.container}>
        
        {/* Categories Section */}
        <View style = {styles.centerContent}>
            <Text style = {styles.mainSection} >Categories</Text>
            <Text> See All</Text>
        </View>

       </View>
    </SafeAreaView>
    </LinearGradient>
  );
};


const styles = StyleSheet.create({

  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  centerContent: {
    flex: 1,
    marginHorizontal: 16,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    
  },
  profileIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#4A90E2',
    alignItems: 'center',
    justifyContent: 'center',
  },

  mainSection: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },

});

export default HomeScreen;