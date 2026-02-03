import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

type Props = {
  name: string;
  subtitle: string;
  avatarUri?: string;
};

export default function ProfileHeader({ name, subtitle, avatarUri }: Props) {
  const fallback =
    "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=200&h=200&fit=crop";

  return (
    <View style={styles.container}>
      <Image source={{ uri: avatarUri || fallback }} style={styles.avatar} />

      <View style={{ flex: 1 }}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 16,
    backgroundColor: "#FFF",
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#E7E7E7",
  },
  avatar: { width: 64, height: 64, borderRadius: 32, backgroundColor: "#eee" },
  name: { fontSize: 18, fontWeight: "800", color: "#111" },
  subtitle: { marginTop: 4, fontSize: 13, color: "#666" },
});
