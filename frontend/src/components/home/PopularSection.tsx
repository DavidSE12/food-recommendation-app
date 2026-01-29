import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

export default function PopularSection() {
  return (
    <View style={styles.container}>
      {/* Heading */}
      <View style={styles.row}>
        <Text style={styles.sectionTitle}>Popular</Text>
        <Text style={styles.seeAll}>See all</Text>
      </View>

      {/* Big Card */}
      <View style={styles.bigCard}>
        <View style={styles.cardRow}>
          {/* Left */}
          <View style={styles.left}>
            <Text style={styles.badge}>Fast Food</Text>
            <Text style={styles.foodName}>Classic Burger</Text>
            <Text style={styles.subtitle}>with special sauce</Text>

            <View style={styles.metaRow}>
              <Text style={styles.meta}>15 mins</Text>
              <Text style={styles.meta}>356 kcal</Text>
            </View>
          </View>

          {/* Right */}
          <View style={styles.right}>
            <Text style={styles.rating}>⭐ 4.5</Text>
            <Image
              source={require('@/assets/images/burger3.png')}
              style={styles.bigImage}
              resizeMode="contain"
            />
          </View>
        </View>
      </View>

      {/* Horizontal small cards placeholder */}
      <View style={styles.placeholder}>
        <Text>Show list cards of restaurants or food</Text>
      </View>
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

  bigCard: {
    width: '100%',
    height: 300,
    borderRadius: 16,
    backgroundColor: '#ff9f67',
    padding: 16,
  },
  cardRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  left: { flex: 1, paddingRight: 10 },
  right: { alignItems: 'flex-end' },

  badge: { fontWeight: '600' },
  foodName: { fontSize: 20, fontWeight: '800', marginTop: 6 },
  subtitle: { marginTop: 2, color: '#333' },

  metaRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 12,
  },
  meta: { color: '#222' },

  rating: { marginBottom: 8, fontWeight: '700' },
  bigImage: {
    width: 140,
    height: 140,
  },

  placeholder: {
    marginTop: 12,
    padding: 14,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.6)',
  },
});
