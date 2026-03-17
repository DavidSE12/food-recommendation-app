import React, { useEffect, useState } from 'react';
import {
  Modal,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import CompactRestaurantCard, { Restaurant } from './CompactRestaurantCard';
import { useLocation } from '@/src/context/LocationContext';

const API_BASE = 'http://192.168.1.112:8080';

type Props = {
  visible: boolean;
  query: string;
  onClose: () => void;
};

export default function SearchResultsModal({ visible, query, onClose }: Props) {
  const { userLocation } = useLocation();
  const router = useRouter();

  const handleCardPress = (restaurant: Restaurant) => {
    onClose();
    // Let the modal close animation finish before navigating
    setTimeout(() => router.push(`/restaurant/${restaurant.id}`), 300);
  };
  const [results, setResults] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!visible || !query.trim()) return;

    const fetchResults = async () => {
      if (!userLocation) {
        setError('Location not available');
        return;
      }
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(
          `${API_BASE}/api/search?query=${encodeURIComponent(query)}&lat=${userLocation.latitude}&lng=${userLocation.longitude}`
        );
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        const mapped: Restaurant[] = data.map((item: any) => ({
          id: item.placeId,
          name: item.name,
          address: item.address,
          rating: item.rating,
          openNow: item.openNow,
          photoUrl: item.photoUrl,
          lat: item.lat,
          lng: item.lng,
          totalRatings: item.totalRatings,
        }));
        setResults(mapped);
      } catch (e: any) {
        setError(e?.message ?? 'Search failed');
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [visible, query]);

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <SafeAreaView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title} numberOfLines={1}>
            Results for "{query}"
          </Text>
          <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
            <Text style={styles.closeText}>✕</Text>
          </TouchableOpacity>
        </View>

        {loading && (
          <View style={styles.center}>
            <ActivityIndicator size="large" color="#FF6B35" />
            <Text style={styles.loadingText}>Searching...</Text>
          </View>
        )}

        {error && !loading && (
          <View style={styles.center}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}

        {!loading && !error && (
          <FlatList
            data={results}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <View style={styles.cardWrapper}>
                <CompactRestaurantCard item={item} onPress={handleCardPress} />
              </View>
            )}
            contentContainerStyle={styles.list}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
              <View style={styles.center}>
                <Text style={styles.emptyText}>No restaurants found for "{query}"</Text>
              </View>
            }
          />
        )}
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFF',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#EFEFEF',
  },
  title: {
    flex: 1,
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1A1A',
    marginRight: 12,
  },
  closeBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeText: {
    fontSize: 14,
    color: '#555',
    fontWeight: '600',
  },
  list: {
    padding: 16,
  },
  cardWrapper: {
    marginBottom: 12,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
    color: '#888',
  },
  errorText: {
    color: '#dc3545',
    fontSize: 15,
    textAlign: 'center',
  },
  emptyText: {
    color: '#888',
    fontSize: 15,
    textAlign: 'center',
  },
});
