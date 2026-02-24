import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useRestaurants } from '@/src/context/RestaurantContext';
import {useRouter} from 'expo-router';


export type Restaurant = {
  placeId: string;
  name: string;
  rating?: number;
  address?: string;
  openNow?: boolean;
  photoUrl?: string;
  lat: number;
  lng: number;
  distance?: number;
  totalRatings?: number;
};

type Props = {
  item: Restaurant;
  onPress?: (item: Restaurant) => void;
};

export default function CompactRestaurantCard({ item, onPress }: Props) {
  const { isFavorite, addToFavorites, removeFromFavorites } = useRestaurants();
  const favorited = isFavorite(item.placeId);

  const handleSaveToggle = (e: any) => {
    e.stopPropagation(); // Prevent card press
    if (favorited) {
      removeFromFavorites(item.placeId);
    } else {
      addToFavorites(item);
    }
  };

  const formatDistance = (meters?: number) => {
    if (!meters) return 'N/A';
    if (meters < 1000) return `${Math.round(meters)}m`;
    return `${(meters / 1000).toFixed(1)}km`;
  };

  const router = useRouter();
   const handlePress = () => {
      router.push(`/restaurant/${item.id}`);
   };

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={handlePress}
      activeOpacity={0.8}
    >
      {/* Image */}
      <View style={styles.imageContainer}>
        {item.photoUrl ? (
          <Image source={{ uri: item.photoUrl }} style={styles.image} />
        ) : (
          <View style={styles.imagePlaceholder}>
            <Text style={styles.placeholderEmoji}>🍽️</Text>
          </View>
        )}

        {/* Save Button */}
        <TouchableOpacity
          style={styles.saveButton}
          onPress={handleSaveToggle}
          activeOpacity={0.7}
        >
          <Text style={styles.saveIcon}>{favorited ? '❤️' : '🤍'}</Text>
        </TouchableOpacity>

        {/* Open/Closed Badge */}
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

      {/* Info */}
      <View style={styles.infoContainer}>
        <Text style={styles.name} numberOfLines={1}>
          {item.name}
        </Text>

        {/* Rating */}
        {item.rating !== undefined && (
          <View style={styles.ratingRow}>
            <Text style={styles.starIcon}>⭐</Text>
            <Text style={styles.ratingText}>{item.rating.toFixed(1)}</Text>
            {item.totalRatings && item.totalRatings > 0 && (
              <Text style={styles.reviewCount}>({item.totalRatings})</Text>
            )}
          </View>
        )}

        {/* Distance */}
        <View style={styles.distanceRow}>
          <Text style={styles.locationIcon}>📍</Text>
          <Text style={styles.distanceText}>{formatDistance(item.distance)}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    width: '100%',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 160,
    backgroundColor: '#f0f0f0',
  },
  imagePlaceholder: {
    width: '100%',
    height: 160,
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
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  saveIcon: {
    fontSize: 20,
  },
  statusBadge: {
    position: 'absolute',
    bottom: 12,
    left: 12,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    gap: 4,
  },
  openBadge: {
    backgroundColor: 'rgba(212, 237, 218, 0.95)',
  },
  closedBadge: {
    backgroundColor: 'rgba(248, 215, 218, 0.95)',
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
    fontSize: 11,
    fontWeight: '700',
  },
  openText: {
    color: '#155724',
  },
  closedText: {
    color: '#721c24',
  },
  infoContainer: {
    padding: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
    marginBottom: 6,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  starIcon: {
    fontSize: 14,
    marginRight: 4,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
    marginRight: 4,
  },
  reviewCount: {
    fontSize: 12,
    color: '#999',
  },
  distanceRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationIcon: {
    fontSize: 12,
    marginRight: 4,
  },
  distanceText: {
    fontSize: 13,
    color: '#666',
    fontWeight: '500',
  },
});