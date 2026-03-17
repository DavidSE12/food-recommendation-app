import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import Map from '@/src/components/map';
import RestaurantBottomSheet from "@/src/components/explore/RestaurantBottomSheet";
import SearchBar from "@/src/components/Search";
import SearchResultsModal from "@/src/components/home/SearchResultsModal";
import { useLocation } from "@/src/context/LocationContext";
import { useRestaurants } from "@/src/context/RestaurantContext";

export default function Explore() {
  const { userLocation } = useLocation();
  const { restaurants } = useRestaurants();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchVisible, setSearchVisible] = useState(false);

  const handleSearch = (text: string) => {
    if (text.trim()) {
      setSearchQuery(text);
      setSearchVisible(true);
    }
  };

  return (
    <View style={styles.container}>
      <Map userLocation={userLocation} restaurants={restaurants} />
      <RestaurantBottomSheet restaurants={restaurants} />
      <SafeAreaView style={styles.overlay} pointerEvents="box-none">
        <SearchBar onSearch={handleSearch} />
      </SafeAreaView>
      <SearchResultsModal
        visible={searchVisible}
        query={searchQuery}
        onClose={() => setSearchVisible(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    pointerEvents: 'box-none',
  },
});
