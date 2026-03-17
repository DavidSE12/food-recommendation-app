import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import CompactRestaurantCard from '@/src/components/home/CompactRestaurantCard';
import { useRestaurants } from '@/src/context/RestaurantContext';

export default function WishlistSection() {
  const { favorites } = useRestaurants();

  if (favorites.length === 0) return null;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Wishlist</Text>
        <Text style={styles.count}>{favorites.length} saved</Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.list}
      >
        {favorites.map(restaurant => (
          <View key={restaurant.id} style={styles.cardWrapper}>
            <CompactRestaurantCard item={restaurant} />
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 4,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 6,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  count: {
    fontSize: 14,
    color: '#FF6A00',
    fontWeight: '600',
  },
  list: {
    paddingLeft: 16,
    paddingBottom: 8,
  },
  cardWrapper: {
    width: 260,
    marginRight: 16,
  },
});
