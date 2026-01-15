import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import SearchBar from '@/src/components/Search';

export default function HomeHeader() {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        {/* Left side */}
        <View>
          <Text style={styles.greeting}>Hello, dat</Text>
          <Text style={styles.title}>What to eat today?</Text>
        </View>

        {/* Right side */}
        <Image
          source={require('@/assets/images/profile.jpg')}
          style={styles.profileIcon}
        />
      </View>

      {/* Search Bar */}
      <View style={styles.searchWrap}>
        <SearchBar />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  greeting: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  title: {
    fontSize: 25,
    color: '#000',
    fontWeight: 'bold',
  },
  profileIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  searchWrap: {
    marginTop: 6,
  },
});
