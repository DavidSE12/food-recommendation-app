import React from "react";
import { StyleSheet, Text, View } from "react-native";
import ProfileRow from "./ProfileRow";

export type ProfileItem = {
  key: string;
  title: string;
  subtitle?: string;
  rightText?: string;
  onPress?: () => void;
};

type Props = {
  title: string;
  items: ProfileItem[];
};

export default function ProfileSection({ title, items }: Props) {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.sectionTitle}>{title}</Text>

      <View style={styles.card}>
        {items.map((item, idx) => (
          <ProfileRow
            key={item.key}
            title={item.title}
            subtitle={item.subtitle}
            rightText={item.rightText}
            onPress={item.onPress}
            isLast={idx === items.length - 1}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { marginTop: 18 },
  sectionTitle: {
    marginBottom: 8,
    marginLeft: 6,
    fontSize: 13,
    fontWeight: "700",
    color: "#444",
    textTransform: "uppercase",
    letterSpacing: 0.6,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 14,
    overflow: "hidden",
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#E7E7E7",
  },
});
