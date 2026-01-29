import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import CategoryChip, { Category } from '@/src/components/home/CategoryChip';

const CATEGORIES: Category[] = [
  { id: '1', title: 'All' },
  { id: '2', title: 'Popular' },
  { id: '3', title: 'Fast Food' },
  { id: '4', title: 'Healthy' },
  { id: '5', title: 'Discount' },
];

export default function CategoriesSection() {
  const [selectedId, setSelectedId] = useState<string>('1');

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.sectionTitle}>Categories</Text>
        <Text style={styles.seeAll}>See All</Text>
      </View>

      <FlatList
        data={CATEGORIES}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <CategoryChip
            item={item}
            isSelected={item.id === selectedId}
            onPress={() => setSelectedId(item.id)}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  seeAll: {
    color: '#333',
  },
  listContent: {
    paddingRight: 16,
  },
});
