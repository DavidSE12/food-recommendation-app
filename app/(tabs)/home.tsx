import React, { useState } from 'react';
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
import { FlatList } from 'react-native-gesture-handler';


type CategoriesType = {
  id: string,
  title: string,
};


const CategoriesData: CategoriesType[] = [
  { id: '1' , title: 'All'},
  { id: '2' , title: 'Popular'},
  { id: '3' , title: 'Fast Food'},
  { id: '4' , title: 'Healthy'},
  { id: '5' , title: 'Discount'},
];

type CategoriesProp = {
  item: CategoriesType;
  onPress: () => void;
  backgroundColor: string;
  textColor: string;
};

const Categories = ({item, onPress, backgroundColor, textColor} : CategoriesProp) => (
  <TouchableOpacity onPress={onPress} style={[styles.item , {backgroundColor}]}>
      <Text style={[styles.title , {color: textColor}]}>{item.title}</Text>
  </TouchableOpacity>
);



const HomeScreen = () => {

  const [selectedId, setSelectedId] = useState<string>();

  const renderItem = ({item} : {item: CategoriesType}) => {
    // Background color
    const backgroundColor = item.id === selectedId ? '#FF6A00' : '#c8c8c8ff';
    
    // Text Color
    const color = item.id === selectedId ? 'white' : 'black';

    return (
      <Categories 
        item = {item}
        onPress= { () => setSelectedId(item.id)}
        backgroundColor = {backgroundColor}
        textColor = {color}
      />
    );

  };



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
          
            <View style = {styles.rowContainer}>
              <Text style = {styles.mainSection} >Categories</Text>
              <Text> See All</Text>
            </View>
          {/* Show Categories data */}
          <FlatList
            data = {CategoriesData}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            extraData={selectedId}
            horizontal
          />
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

  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 20,
  },

  rowContainer: {
    flexDirection: 'row',
    justifyContent: "space-between"
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

  title: {
    fontSize: 32,
  },

  



});

export default HomeScreen;