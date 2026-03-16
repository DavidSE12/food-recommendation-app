import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

type Props = {
  title: string;
  subtitle?: string;
  rightText?: string;
  onPress?: () => void;
  isLast?: boolean;
};

export default function ProfileRow({
  title,
  subtitle,
  rightText,
  onPress,
  isLast,
}: Props) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.row,
        pressed && styles.pressed,
        isLast && styles.lastRow,
      ]}
    >
      <View style={styles.left}>
        <Text style={styles.title}>{title}</Text>
        {!!subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      </View>

      <View style={styles.right}>
        {!!rightText && <Text style={styles.rightText}>{rightText}</Text>}
        <Text style={styles.chevron}>›</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    paddingVertical: 15,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFF",
    borderBottomWidth: 1,
    borderBottomColor: "#F8F0EC",
  },
  pressed: { backgroundColor: "#FFF7F4" },
  lastRow: { borderBottomWidth: 0 },
  left: { flex: 1, paddingRight: 10 },
  title: { fontSize: 15, fontWeight: "600", color: "#1A1A1A" },
  subtitle: { marginTop: 3, fontSize: 13, color: "#999" },
  right: { flexDirection: "row", alignItems: "center", gap: 6 },
  rightText: { fontSize: 13, color: "#FF6B35", fontWeight: "600" },
  chevron: { fontSize: 20, lineHeight: 22, color: "#CCBBB5" },
});
