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
    paddingVertical: 14,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFF",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#E7E7E7",
  },
  pressed: { opacity: 0.7 },
  lastRow: { borderBottomWidth: 0 },
  left: { flex: 1, paddingRight: 10 },
  title: { fontSize: 16, fontWeight: "600", color: "#111" },
  subtitle: { marginTop: 4, fontSize: 13, color: "#666" },
  right: { flexDirection: "row", alignItems: "center", gap: 8 },
  rightText: { fontSize: 13, color: "#666" },
  chevron: { fontSize: 22, lineHeight: 22, color: "#999" },
});
