import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { FlatList, StatusBar, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import CategoriesSection from '@/src/components/home/CategoriesSection';
import HomeHeader from '@/src/components/home/HomeHeader';
import MapSection from '@/src/components/home/MapSection';
import PopularSection from '@/src/components/home/PopularSection';




export default function HomeScreen() {
  return (
    <LinearGradient
      colors={['#FFFFFF', '#FFFFFF', '#FFE9C7']}
      locations={[0.46, 0.63, 1]}
      start={{ x: 0.85, y: 0.05 }}
      end={{ x: 0.15, y: 0.95 }}
      style={styles.gradient}
    >
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="dark-content" backgroundColor="#fff" />

        {/* One vertical scroll container for the whole screen */}
        <FlatList
          data={[]}
          renderItem={() => null}
          keyExtractor={(_, index) => String(index)}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.content}
          ListHeaderComponent={
            <>
              <HomeHeader />
              <CategoriesSection />
              <MapSection />
              <PopularSection />
              <View style={{ height: 600 }} />
            </>
            
          }
          
        />
      </SafeAreaView>
 
    </LinearGradient>
  );
}



const styles = StyleSheet.create({
  gradient: { flex: 1 },
  safeArea: { flex: 1 },
  content: { paddingBottom: 24 },
});


