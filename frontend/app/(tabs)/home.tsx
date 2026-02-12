import React from 'react';
import { FlatList, StatusBar, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MapSection from '@/src/components/home/MapSection';
import CategoriesSection from '@/src/components/home/CategoriesSection';
import HomeHeader from '@/src/components/home/HomeHeader';
import RestaurantCard from '@/src/components/explore/RestaurantCard';
import PopularSection from '@/src/components/home/PopularSection';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF" />

      {/* One vertical scroll container for the whole screen */}
      <FlatList
        data={[]}
        renderItem={null}
        keyExtractor={(_, index) => String(index)}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
        ListHeaderComponent={
          <>
            <HomeHeader />
            <CategoriesSection />
            <PopularSection />
            <View style={{ height: 600 }} />
          </>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFF', // ✅ pure white everywhere
  },
  content: {
    paddingBottom: 24,
  },
});
