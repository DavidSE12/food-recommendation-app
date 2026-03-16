import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  StatusBar,
  Image,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRestaurants } from '@/src/context/RestaurantContext';

export default function WishList() {
  const { favorites, removeFromFavorites } = useRestaurants();

  const formatDistance = (meters?: number) => {
    if (!meters) return null;
    if (meters < 1000) return `${Math.round(meters)}m`;
    return `${(meters / 1000).toFixed(1)}km`;
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>My Wishlist</Text>
        <Text style={styles.subtitle}>
          {favorites.length} saved place{favorites.length !== 1 ? 's' : ''}
        </Text>
      </View>

      {favorites.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyEmoji}>🤍</Text>
          <Text style={styles.emptyTitle}>Nothing saved yet</Text>
          <Text style={styles.emptyText}>
            Tap the heart on any restaurant to save it here
          </Text>
        </View>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={styles.card}>
              {/* Image */}
              {item.photoUrl ? (
                <Image source={{ uri: item.photoUrl }} style={styles.image} />
              ) : (
                <View style={styles.imagePlaceholder}>
                  <Text style={styles.placeholderEmoji}>🍽️</Text>
                </View>
              )}

              {/* Remove Button */}
              <TouchableOpacity
                style={styles.heartBtn}
                onPress={() => removeFromFavorites(item.id)}
                activeOpacity={0.8}
              >
                <Text style={styles.heartIcon}>❤️</Text>
              </TouchableOpacity>

              {/* Open/Closed badge */}
              {item.openNow !== undefined && (
                <View style={[styles.badge, item.openNow ? styles.openBadge : styles.closedBadge]}>
                  <View style={[styles.dot, item.openNow ? styles.openDot : styles.closedDot]} />
                  <Text style={[styles.badgeText, item.openNow ? styles.openText : styles.closedText]}>
                    {item.openNow ? 'Open' : 'Closed'}
                  </Text>
                </View>
              )}

              {/* Info */}
              <View style={styles.info}>
                <Text style={styles.name} numberOfLines={1}>{item.name}</Text>

                <View style={styles.metaRow}>
                  {item.rating !== undefined && (
                    <View style={styles.ratingRow}>
                      <Text style={styles.star}>⭐</Text>
                      <Text style={styles.ratingText}>{item.rating.toFixed(1)}</Text>
                    </View>
                  )}
                  {formatDistance(item.distance) && (
                    <Text style={styles.distance}>📍 {formatDistance(item.distance)}</Text>
                  )}
                </View>

                {item.address && (
                  <Text style={styles.address} numberOfLines={1}>{item.address}</Text>
                )}
              </View>
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 12,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: '#1A1A1A',
  },
  subtitle: {
    fontSize: 14,
    color: '#888',
    marginTop: 2,
  },
  listContent: {
    padding: 16,
    gap: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyEmoji: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 15,
    color: '#888',
    textAlign: 'center',
    lineHeight: 22,
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 8,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 160,
    backgroundColor: '#F0F0F0',
  },
  imagePlaceholder: {
    width: '100%',
    height: 160,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderEmoji: {
    fontSize: 48,
  },
  heartBtn: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'rgba(255,255,255,0.95)',
    width: 38,
    height: 38,
    borderRadius: 19,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  heartIcon: {
    fontSize: 20,
  },
  badge: {
    position: 'absolute',
    bottom: 82,
    left: 12,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    gap: 4,
  },
  openBadge: { backgroundColor: 'rgba(212,237,218,0.95)' },
  closedBadge: { backgroundColor: 'rgba(248,215,218,0.95)' },
  dot: { width: 6, height: 6, borderRadius: 3 },
  openDot: { backgroundColor: '#28a745' },
  closedDot: { backgroundColor: '#dc3545' },
  badgeText: { fontSize: 11, fontWeight: '700' },
  openText: { color: '#155724' },
  closedText: { color: '#721c24' },
  info: {
    padding: 14,
  },
  name: {
    fontSize: 17,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 6,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 4,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  star: { fontSize: 13 },
  ratingText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  distance: {
    fontSize: 13,
    color: '#666',
  },
  address: {
    fontSize: 13,
    color: '#999',
    marginTop: 2,
  },
});
