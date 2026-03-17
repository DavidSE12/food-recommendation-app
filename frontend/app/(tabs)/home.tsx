import React, { useState } from 'react';
import { FlatList, StatusBar, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CategoriesSection from '@/src/components/home/CategoriesSection';
import HomeHeader from '@/src/components/home/HomeHeader';
import WishlistSection from '@/src/components/home/WishlistSection';
import AIChatModal from '@/src/components/home/AIChatModal';
import SearchResultsModal from '@/src/components/home/SearchResultsModal';


export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchVisible, setSearchVisible] = useState(false);

  const handleSearch = (text: string) => {
    if (text.trim()) {
      setSearchQuery(text);
      setSearchVisible(true);
    }
  };

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
            <HomeHeader onSearch={handleSearch} />
            <CategoriesSection />
            <WishlistSection />
            <View style={{ height: 8 }} />
          </>
        }
      />

      {/* AI Chat floating button + modal */}
      <AIChatModal />

      {/* Search results modal */}
      <SearchResultsModal
        visible={searchVisible}
        query={searchQuery}
        onClose={() => setSearchVisible(false)}
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
