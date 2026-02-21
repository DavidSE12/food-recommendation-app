// app/restaurant/[placeId].tsx

import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Linking,
} from "react-native";

// ─── Types ────────────────────────────────────────────────────────────────────

type OpeningHours = {
  weekday_text?: string[];
  open_now?: boolean;
};

type PlaceDetail = {
  placeId: string;
  name: string;
  address: string;
  website?: string;
  photoUrls?: string[];
  openingHours?: OpeningHours;
  priceLevel?: string;
  reviews?: string[];
};

// ─── API ──────────────────────────────────────────────────────────────────────

const BASE_URL = "http://192.168.56.1:8080";

async function fetchPlaceDetail(placeId: string): Promise<PlaceDetail> {
  const res = await fetch(`${BASE_URL}/api/restaurant/${placeId}`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function RestaurantDetailScreen() {
  const { placeId } = useLocalSearchParams<{ placeId: string }>();
  const router = useRouter();

  const [place, setPlace] = useState<PlaceDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activePhoto, setActivePhoto] = useState(0);
  const [hoursExpanded, setHoursExpanded] = useState(false);

  useEffect(() => {
    if (!placeId) return;
    setLoading(true);
    fetchPlaceDetail(placeId)
      .then((data) => setPlace(data))
      .catch((e) => setError(e.message ?? "Failed to load"))
      .finally(() => setLoading(false));
  }, [placeId]);

  // ── Loading ──────────────────────────────────────────────────────────────
  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#1a1a1a" />
        <Text style={styles.loadingText}>Loading restaurant…</Text>
      </View>
    );
  }

  // ── Error ────────────────────────────────────────────────────────────────
  if (error || !place) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorEmoji}>⚠️</Text>
        <Text style={styles.errorText}>{error ?? "Restaurant not found"}</Text>
        <TouchableOpacity style={styles.retryBtn} onPress={() => router.back()}>
          <Text style={styles.retryText}>Go back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // ── Success ──────────────────────────────────────────────────────────────
  const photos = place.photoUrls ?? [];

  return (
    <ScrollView style={styles.root} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>

      {/* Back button */}
      <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
        <Text style={styles.backArrow}>←</Text>
      </TouchableOpacity>

      {/* Photo carousel */}
      {photos.length > 0 && (
        <View style={styles.photoWrap}>
          <Image source={{ uri: photos[activePhoto] }} style={styles.heroPic} />
          {photos.length > 1 && (
            <View style={styles.dots}>
              {photos.map((_, i) => (
                <TouchableOpacity key={i} onPress={() => setActivePhoto(i)}>
                  <View style={[styles.dot, i === activePhoto && styles.dotActive]} />
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
      )}

      {/* Name + price */}
      <View style={styles.header}>
        <View style={styles.titleRow}>
          <Text style={styles.name}>{place.name}</Text>
          {place.priceLevel && (
            <Text style={styles.priceTag}>{place.priceLevel}</Text>
          )}
        </View>
      </View>

      <View style={styles.divider} />

      {/* Address */}
      <View style={styles.section}>
        <Text style={styles.sectionLabel}>📍 Address</Text>
        <Text style={styles.sectionValue}>{place.address}</Text>
      </View>

      {/* Opening Hours */}
      {place.openingHours && (
        <View style={styles.section}>
          <TouchableOpacity
            style={styles.hoursHeader}
            onPress={() => setHoursExpanded((v) => !v)}
          >
            <Text style={styles.sectionLabel}>🕐 Hours</Text>
            <View style={[styles.statusBadge, place.openingHours.open_now ? styles.openBadge : styles.closedBadge]}>
              <Text style={styles.statusText}>
                {place.openingHours.open_now ? "Open now" : "Closed"}
              </Text>
            </View>
            <Text style={styles.chevron}>{hoursExpanded ? "▲" : "▼"}</Text>
          </TouchableOpacity>

          {hoursExpanded &&
            place.openingHours.weekday_text?.map((line, i) => (
              <Text key={i} style={styles.hoursLine}>{line}</Text>
            ))}
        </View>
      )}

      {/* Website */}
      {place.website && (
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>🌐 Website</Text>
          <TouchableOpacity onPress={() => Linking.openURL(place.website!)}>
            <Text style={[styles.sectionValue, styles.link]} numberOfLines={1}>
              {place.website}
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Reviews */}
      {place.reviews && place.reviews.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>💬 Reviews</Text>
          {place.reviews.map((review, i) => (
            <View key={i} style={styles.reviewCard}>
              <Text style={styles.reviewText}>{review.text}</Text>
              <Text style={styles.reviewAuthor}>— {review.authorName}</Text>
              <Text style={styles.reviewRating}>★ {review.rating}</Text>
            </View>
          ))}
        </View>
      )}

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#faf9f6" },
  content: { paddingBottom: 40 },

  center: { flex: 1, alignItems: "center", justifyContent: "center", padding: 24, gap: 12 },
  loadingText: { color: "#888", marginTop: 8, fontSize: 14 },
  errorEmoji: { fontSize: 40 },
  errorText: { fontSize: 15, color: "#555", textAlign: "center" },
  retryBtn: { marginTop: 8, paddingVertical: 10, paddingHorizontal: 24, backgroundColor: "#1a1a1a", borderRadius: 10 },
  retryText: { color: "#fff", fontWeight: "600" },

  backBtn: {
    position: "absolute",
    top: 52,
    left: 16,
    zIndex: 10,
    backgroundColor: "rgba(255,255,255,0.9)",
    borderRadius: 22,
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
    elevation: 3,
  },
  backArrow: { fontSize: 20, color: "#1a1a1a" },

  photoWrap: { width: "100%", height: 280, backgroundColor: "#e8e4de" },
  heroPic: { width: "100%", height: "100%", resizeMode: "cover" },
  dots: { position: "absolute", bottom: 14, flexDirection: "row", alignSelf: "center", gap: 6 },
  dot: { width: 7, height: 7, borderRadius: 4, backgroundColor: "rgba(255,255,255,0.5)" },
  dotActive: { backgroundColor: "#fff", width: 20 },

  header: { padding: 20, paddingBottom: 8 },
  titleRow: { flexDirection: "row", alignItems: "center", gap: 10 },
  name: { flex: 1, fontSize: 26, fontWeight: "800", color: "#1a1a1a", fontFamily: "Georgia", lineHeight: 32 },
  priceTag: { fontSize: 14, fontWeight: "700", color: "#888", backgroundColor: "#f0ede8", paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 },

  divider: { height: 1, backgroundColor: "#e8e4de", marginHorizontal: 20, marginVertical: 8 },

  section: { paddingHorizontal: 20, paddingVertical: 14, gap: 6 },
  sectionLabel: { fontSize: 12, fontWeight: "700", color: "#999", textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 },
  sectionValue: { fontSize: 15, color: "#333", lineHeight: 22 },
  link: { color: "#c0392b", textDecorationLine: "underline" },

  hoursHeader: { flexDirection: "row", alignItems: "center", gap: 10 },
  statusBadge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 8 },
  openBadge: { backgroundColor: "#d4edda" },
  closedBadge: { backgroundColor: "#f8d7da" },
  statusText: { fontSize: 12, fontWeight: "700" },
  chevron: { marginLeft: "auto", color: "#999", fontSize: 11 },
  hoursLine: { fontSize: 13, color: "#555", lineHeight: 22 },

  reviewCard: { backgroundColor: "#fff", borderRadius: 12, padding: 14, borderWidth: 1, borderColor: "#e8e4de", marginTop: 8 },
  reviewText: { fontSize: 14, color: "#444", lineHeight: 22 },
});