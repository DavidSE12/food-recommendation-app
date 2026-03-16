import React from 'react';
import { FlatList, StatusBar, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CategoriesSection from '@/src/components/home/CategoriesSection';
import HomeHeader from '@/src/components/home/HomeHeader';
import AIChatModal from '@/src/components/home/AIChatModal';


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
            <View style={{ height: 20 }} />
          </>
        }
      />

      {/* AI Chat floating button + modal */}
      <AIChatModal />
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
