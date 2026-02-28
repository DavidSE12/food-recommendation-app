import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';

import {useRouter} from "expo-router";

export type Restaurant = {
  id: string;
  name: string;
  address?: string;
  rating?: number;
  totalRating: number;
  priceLevel?: string;
  lat: number;
  lng: number;
  openNow?: boolean;
  photoRef?: string;
  photoUrl?: string;
};

type Props = {
  item: Restaurant;
  onPress?: (item: Restaurant) => void;
};

export default function RestaurantCard({ item, onPress }: Props) {
  const [isSaved, setIsSaved] = useState(false);
  const router = useRouter();

  const handlePress = () => {
        if (onPress){
            onPress(item)
        }
//     router.push(`/restaurant/${item.id}`);
    console.log("Hii");
  };

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
      onPress={handlePress}
      activeOpacity={0.7}
    >
      {/* Restaurant Image */}
      {item.photoUrl ? (
        <Image source={{ uri: item.photoUrl }} style={styles.image} />
      ) :
      (
        <View style={styles.imagePlaceholder}>
          <Text style={styles.placeholderEmoji}>🍽️</Text>
          <Text> {item.photoUrl} </Text>

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
              </Text>
            </View>
          )}
        </View>

        {/* Opening Hours */}
        {item.openingHours && (
          <View style={styles.hoursRow}>
            <Text style={styles.clockIcon}>🕐</Text>
            <Text style={styles.hoursText}>{item.openingHours}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
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
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
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
  },
  openBadge: {
    backgroundColor: '#d4edda',
  },
  closedBadge: {
    backgroundColor: '#f8d7da',
  },
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
  },
});