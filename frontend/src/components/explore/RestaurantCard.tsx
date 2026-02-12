<<<<<<< HEAD
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

// Import or define Restaurant type
export type RestaurantProps = {
=======
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';

export type Restaurant = {
>>>>>>> 4b00787 (Create bottom sheet to show restaurant card but still got error of getting data from backend)
  id: string;
  name: string;
  rating?: number;
  address?: string;
  openNow?: boolean;
  photoUrl?: string;
  lat: number;
  lng: number;
<<<<<<< HEAD
};

type Props = {  // ← Fixed: Added '='
=======
  distance?: number; // in meters
  openingHours?: string; // e.g., "9:00 AM - 10:00 PM"
};

type Props = {
>>>>>>> 4b00787 (Create bottom sheet to show restaurant card but still got error of getting data from backend)
  item: Restaurant;
  onPress?: (item: Restaurant) => void;
};

<<<<<<< HEAD
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
=======
export default function RestaurantCard({ item, onPress }: Props) {
  const [isSaved, setIsSaved] = useState(false);

  // Format distance
  const formatDistance = (meters?: number) => {
    if (!meters) return 'N/A';
    if (meters < 1000) {
      return `${Math.round(meters)}m`;
    }
    return `${(meters / 1000).toFixed(1)}km`;
  };

  // Handle save button
  const handleSave = () => {
    setIsSaved(!isSaved);
    console.log(`Restaurant ${item.name} ${!isSaved ? 'saved' : 'unsaved'}`);
  };

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => onPress?.(item)}
      activeOpacity={0.7}
    >
      {/* Restaurant Image */}
      {item.photoUrl ? (
        <Image source={{ uri: item.photoUrl }} style={styles.image} />
      ) : (
        <View style={styles.imagePlaceholder}>
          <Text style={styles.placeholderEmoji}>🍽️</Text>
        </View>
      )}

      {/* Save Button (Heart Icon) */}
      <TouchableOpacity
        style={styles.saveButton}
        onPress={handleSave}
        activeOpacity={0.7}
      >
        <Text style={styles.saveIcon}>{isSaved ? '❤️' : '🤍'}</Text>
      </TouchableOpacity>

      {/* Restaurant Info */}
      <View style={styles.infoContainer}>
        {/* Name */}
        <Text style={styles.name} numberOfLines={1}>
          {item.name}
        </Text>

        {/* Address with Distance */}
        <View style={styles.addressRow}>
          <Text style={styles.addressIcon}>📍</Text>
          <Text style={styles.address} numberOfLines={1}>
            {item.address || 'No address'}
          </Text>
          <Text style={styles.distance}> • {formatDistance(item.distance)}</Text>
        </View>

        {/* Rating and Open Hours Row */}
        <View style={styles.metaRow}>
          {/* Rating */}
          {item.rating !== undefined && (
            <View style={styles.ratingContainer}>
              <Text style={styles.starIcon}>⭐</Text>
              <Text style={styles.ratingText}>{item.rating.toFixed(1)}</Text>
            </View>
          )}

          {/* Open/Closed Status */}
          {item.openNow !== undefined && (
            <View
              style={[
                styles.statusBadge,
                item.openNow ? styles.openBadge : styles.closedBadge,
              ]}
            >
              <View
                style={[
                  styles.statusDot,
                  item.openNow ? styles.openDot : styles.closedDot,
                ]}
              />
              <Text
                style={[
                  styles.statusText,
                  item.openNow ? styles.openText : styles.closedText,
                ]}
              >
                {item.openNow ? 'Open' : 'Closed'}
>>>>>>> 4b00787 (Create bottom sheet to show restaurant card but still got error of getting data from backend)
              </Text>
            </View>
          )}
        </View>
<<<<<<< HEAD
=======

        {/* Opening Hours */}
        {item.openingHours && (
          <View style={styles.hoursRow}>
            <Text style={styles.clockIcon}>🕐</Text>
            <Text style={styles.hoursText}>{item.openingHours}</Text>
          </View>
        )}
>>>>>>> 4b00787 (Create bottom sheet to show restaurant card but still got error of getting data from backend)
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
<<<<<<< HEAD
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
=======
    backgroundColor: '#fff',
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 180,
    backgroundColor: '#f0f0f0',
  },
  imagePlaceholder: {
    width: '100%',
    height: 180,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderEmoji: {
    fontSize: 48,
  },
  saveButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  saveIcon: {
    fontSize: 22,
  },
  infoContainer: {
    padding: 16,
  },
  name: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
    marginBottom: 8,
  },
  addressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  addressIcon: {
    fontSize: 12,
    marginRight: 4,
  },
  address: {
    flex: 1,
    fontSize: 13,
    color: '#666',
  },
  distance: {
    fontSize: 13,
    color: '#999',
    fontWeight: '600',
>>>>>>> 4b00787 (Create bottom sheet to show restaurant card but still got error of getting data from backend)
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
<<<<<<< HEAD
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
=======
    marginBottom: 8,
    gap: 12,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  starIcon: {
    fontSize: 14,
    marginRight: 4,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
>>>>>>> 4b00787 (Create bottom sheet to show restaurant card but still got error of getting data from backend)
  },
  openBadge: {
    backgroundColor: '#d4edda',
  },
  closedBadge: {
    backgroundColor: '#f8d7da',
  },
<<<<<<< HEAD
  statusText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#333',
=======
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  openDot: {
    backgroundColor: '#28a745',
  },
  closedDot: {
    backgroundColor: '#dc3545',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  openText: {
    color: '#155724',
  },
  closedText: {
    color: '#721c24',
  },
  hoursRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  clockIcon: {
    fontSize: 12,
    marginRight: 4,
  },
  hoursText: {
    fontSize: 12,
    color: '#666',
>>>>>>> 4b00787 (Create bottom sheet to show restaurant card but still got error of getting data from backend)
  },
});