import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import CategoryChip, { Category } from '@/src/components/home/CategoryChip';
import CompactRestaurantCard from '@/src/components/home/CompactRestaurantCard';
import { useRestaurants } from '@/src/context/RestaurantContext';

const CATEGORIES: Category[] = [
  { id: 'all', title: 'All', filter: null },
  { id: 'popular', title: 'Popular', filter: (r) => (r.rating || 0) >= 4.3 },
  { id: 'top-rated', title: 'Top Rated', filter: (r) => (r.rating || 0) >= 4.5 },
  { id: 'nearby', title: 'Nearby', filter: (r) => (r.distance || 99999) <= 1000 }, // Within 1km
  { id: 'open-now', title: 'Open Now', filter: (r) => r.openNow === true },
];

export default function CategoriesSection() {
  const [selectedId, setSelectedId] = useState<string>('all');
  const { restaurants, loading } = useRestaurants();

  // Get selected category
  const selectedCategory = CATEGORIES.find(cat => cat.id === selectedId);

  // Filter restaurants based on selected category
  const filteredRestaurants = selectedCategory?.filter
    ? restaurants.filter(selectedCategory.filter)
    : restaurants;

  // Sort by rating (highest first)
  const sortedRestaurants = [...filteredRestaurants].sort(
    (a, b) => (b.rating || 0) - (a.rating || 0)
  );

  return (
    <View style={styles.container}>
      {/* Categories Header */}
      <View style={styles.row}>
        <Text style={styles.sectionTitle}>Categories</Text>
        <Text style={styles.seeAll}>See All</Text>
      </View>

      {/* Category Chips */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.chipList}
      >
        {CATEGORIES.map((item) => (
          <CategoryChip
            key={item.id}
            item={item}
            isSelected={item.id === selectedId}
            onPress={() => setSelectedId(item.id)}
          />
        ))}
      </ScrollView>

      {/* Restaurants Section */}
      <View style={styles.restaurantsHeader}>
        <Text style={styles.restaurantsTitle}>
          {selectedCategory?.title} Restaurants
        </Text>
        <Text style={styles.restaurantsCount}>
          {sortedRestaurants.length} places
        </Text>
      </View>

      {/* Restaurant List */}
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#FF6A00" />
          <Text style={styles.loadingText}>Loading restaurants...</Text>
        </View>
      ) : sortedRestaurants.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyEmoji}>🔍</Text>
          <Text style={styles.emptyText}>No restaurants found</Text>
          <Text style={styles.emptySubtext}>
            Try selecting a different category
          </Text>
        </View>
      ) : (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.restaurantList}
        >
          {sortedRestaurants.slice(0, 10).map((restaurant) => (
            <View key={restaurant.placeId} style={styles.cardWrapper}>
              <CompactRestaurantCard
                item={restaurant}
                onPress={(item) => {
                  console.log('Selected restaurant:', item.name);
                  // Navigate to restaurant details or show modal
                }}
              />
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  seeAll: {
    color: '#FF6A00',
    fontSize: 14,
    fontWeight: '600',
  },
  chipList: {
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  restaurantsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 12,
  },
  restaurantsTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
  },
  restaurantsCount: {
    fontSize: 14,
    color: '#666',
  },
  restaurantList: {
    paddingLeft: 16,
    paddingBottom: 20,
  },
  cardWrapper: {
    width: 260,
    marginRight: 16,
  },
  loadingContainer: {
    paddingVertical: 60,
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
    color: '#666',
  },
  emptyContainer: {
    paddingVertical: 60,
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyEmoji: {
    fontSize: 48,
    marginBottom: 12,
  },
  emptyText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
  },
});