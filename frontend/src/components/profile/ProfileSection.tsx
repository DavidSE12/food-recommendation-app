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
  wrapper: { marginTop: 20 },
  sectionTitle: {
    marginBottom: 10,
    marginLeft: 4,
    fontSize: 13,
    fontWeight: "700",
    color: "#FF6B35",
    textTransform: "uppercase",
    letterSpacing: 0.8,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 18,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#F5EDE8",
    shadowColor: "#FF6B35",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
});
