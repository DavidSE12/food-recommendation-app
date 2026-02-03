import React, { useMemo } from "react";
import { FlatList, StatusBar, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

import ProfileHeader from "@/src/components/profile/ProfileHeader";
import ProfileSection from "@/src/components/profile/ProfileSection";
import { buildProfileSections } from "@/src/components/profile/ProfileData";

export default function Profile() {
  const router = useRouter();

  const { account, preferences, support } = useMemo(
    () =>
      buildProfileSections({
        push: router.push,
        themeLabel: "System",
        languageLabel: "English",
      }),
    [router]
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF" />

      {/* Single vertical scroll container */}
      <FlatList
        data={[]}
        renderItem={null}
        keyExtractor={(_, index) => String(index)}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
        ListHeaderComponent={
          <View style={styles.headerWrap}>
            <ProfileHeader
              name="Huu Tien Dat Huynh"
              subtitle="Student • La Trobe University"
            />

            <View style={styles.sectionsWrap}>
              <ProfileSection title="Account" items={account} />
              <ProfileSection title="Preferences" items={preferences} />
              <ProfileSection title="Support" items={support} />
            </View>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFF", // ✅ pure white everywhere
  },
  content: {
    paddingHorizontal: 16,
    paddingBottom: 24,
    paddingTop: 10,
  },
  headerWrap: {
    gap: 10,
  },
  sectionsWrap: {
    marginTop: 6,
  },
});
