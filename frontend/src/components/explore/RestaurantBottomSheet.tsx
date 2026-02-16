
import React, { useMemo, useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import BottomSheet, { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import RestaurantCard, { Restaurant } from './RestaurantCard';

type Props = {
  restaurants: Restaurant[];
  onSelect?: (restaurant: Restaurant) => void;
  initialIndex?: number;
};

export default function RestaurantBottomSheet({
  restaurants,
  onSelect,
  initialIndex = 1, // Start at 50% (middle snap point)
}: Props) {
  // Ref
  const bottomSheetRef = useRef<BottomSheet>(null);

  // Snap points: 25%, 50%, 75% of screen height
  const snapPoints = useMemo(() => ['25%', '50%', '75%'], []);

  return (
    <BottomSheet
      ref={bottomSheetRef}
      snapPoints={snapPoints}
      index={initialIndex}
      enablePanDownToClose={false} // Keep it always visible
      handleIndicatorStyle={styles.handleIndicator}
      backgroundStyle={styles.background}
      enableDynamicSizing={false}
    >
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>
          {restaurants.length} Restaurant{restaurants.length !== 1 ? 's' : ''} Nearby
        </Text>
        <Text style={styles.headerSubtitle}>
          Swipe up to see more
        </Text>
      </View>

      {/* Restaurant List */}
      <BottomSheetFlatList
        data={restaurants}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <RestaurantCard
            item={item}
            onPress={onSelect}
          />
        )}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyEmoji}>🔍</Text>
            <Text style={styles.emptyText}>No restaurants found</Text>
            <Text style={styles.emptySubtext}>
              Try adjusting your search area
            </Text>
          </View>
        }
      />
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  handleIndicator: {
    backgroundColor: '#ddd',
    width: 40,
    height: 4,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 13,
    color: '#666',
  },
  listContent: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 100, // Extra padding at bottom
  },
  emptyContainer: {
    paddingTop: 60,
    paddingHorizontal: 40,
    alignItems: 'center',
  },
  emptyEmoji: {
    fontSize: 48,
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
  },
});