import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useRestaurants } from "@/src/context/RestaurantContext";
import { useUser } from "@/src/context/UserContext";

type Props = {
  name: string;
  subtitle: string;
};

export default function ProfileHeader({ name, subtitle }: Props) {
  const { favorites, restaurants } = useRestaurants();
  const { userProfile } = useUser();

  const displayName = userProfile?.name || name;
  const displaySub = userProfile
    ? `${userProfile.age ? `Age ${userProfile.age}` : ''}${userProfile.weight ? ` · ${userProfile.weight}kg` : ''} · ${userProfile.budget || 'Casual'}`
    : subtitle;

  return (
    <View style={styles.container}>
      {/* Warm background card */}
      <View style={styles.card}>
        {/* Name & subtitle */}
        <Text style={styles.name}>{displayName}</Text>
        <Text style={styles.subtitle}>{displaySub}</Text>

        {/* Stats row */}
        <View style={styles.statsRow}>
          <View style={styles.stat}>
            <Text style={styles.statValue}>{restaurants.length}</Text>
            <Text style={styles.statLabel}>Nearby</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.stat}>
            <Text style={styles.statValue}>{favorites.length}</Text>
            <Text style={styles.statLabel}>Saved</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.stat}>
            <Text style={styles.statValue}>0</Text>
            <Text style={styles.statLabel}>Reviews</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 0,
    paddingTop: 8,
  },
  card: {
    backgroundColor: "#FFF3EE",
    borderRadius: 24,
    paddingVertical: 28,
    paddingHorizontal: 20,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#FFE0D0",
  },
  name: {
    fontSize: 20,
    fontWeight: "800",
    color: "#1A1A1A",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 13,
    color: "#888",
    marginBottom: 20,
  },
  statsRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 20,
    width: "100%",
    justifyContent: "space-around",
    shadowColor: "#FF6B35",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  stat: {
    alignItems: "center",
    flex: 1,
  },
  statValue: {
    fontSize: 22,
    fontWeight: "800",
    color: "#FF6B35",
  },
  statLabel: {
    fontSize: 12,
    color: "#888",
    marginTop: 2,
    fontWeight: "500",
  },
  divider: {
    width: 1,
    height: 32,
    backgroundColor: "#F0F0F0",
  },
});
