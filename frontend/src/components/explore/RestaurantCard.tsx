import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

// Import or define Restaurant type
export type RestaurantProps = {
  id: string;
  name: string;
  rating?: number;
  address?: string;
  openNow?: boolean;
  photoUrl?: string;
  lat: number;
  lng: number;
};

type Props = {  // ← Fixed: Added '='
  item: Restaurant;
  onPress?: (item: Restaurant) => void;
};

export default function RestaurantCard({ item, onPress }: Props) {  // ← Added onPress
  return (
    <TouchableOpacity   // ← Changed View to TouchableOpacity
      style={styles.card}
      onPress={() => onPress?.(item)}  // ← Added onPress handler
      activeOpacity={0.7}
      disabled={!onPress}  // Disable if no onPress provided
    >
      {/* Optional image */}
      {item.photoUrl ? (
        <Image source={{ uri: item.photoUrl }} style={styles.image} />
      ) : (
        <View style={styles.imageFallback}>
          <Text style={styles.fallbackEmoji}>🍽️</Text>
        </View>
      )}

      <View style={{ flex: 1 }}>
        <Text style={styles.title} numberOfLines={1}>
          {item.name}
        </Text>

        <Text style={styles.sub} numberOfLines={1}>
          {item.address ?? "No address"}
        </Text>

        <View style={styles.metaRow}>
          <Text style={styles.meta}>
            ⭐ {item.rating?.toFixed(1) ?? "N/A"}
          </Text>

          {/* Show open/closed status if available */}
          {item.openNow !== undefined && (
            <View style={[
              styles.statusBadge,
              item.openNow ? styles.openBadge : styles.closedBadge
            ]}>
              <Text style={styles.statusText}>
                {item.openNow ? '🟢 Open' : '🔴 Closed'}
              </Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 12,
    marginBottom: 12,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#E7E7E7",
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
    // Add shadow for better visual
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 14,
    backgroundColor: "#eee"
  },
  imageFallback: {
    width: 70,
    height: 70,
    borderRadius: 14,
    backgroundColor: "#f0f0f0",
    justifyContent: 'center',
    alignItems: 'center',
  },
  fallbackEmoji: {
    fontSize: 32,
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    color: '#333',
  },
  sub: {
    marginTop: 4,
    color: "#666",
    fontSize: 13,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    gap: 8,
  },
  meta: {
    fontWeight: "600",
    fontSize: 14,
    color: '#333',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  openBadge: {
    backgroundColor: '#d4edda',
  },
  closedBadge: {
    backgroundColor: '#f8d7da',
  },
  statusText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#333',
  },
});