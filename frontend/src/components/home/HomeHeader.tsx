import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import SearchBar from '@/src/components/Search';

type Props = {
  onSearch: (text: string) => void;
};

export default function HomeHeader({ onSearch }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.greeting}>Hello, dat</Text>
        <Text style={styles.title}>What to eat today?</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchWrap}>
        <SearchBar onSearch={onSearch} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 6,
    paddingBottom: 0,
  },
  row: {
    paddingVertical: 4,
  },
  greeting: {
    fontSize: 13,
    color: '#666',
    marginBottom: 2,
  },
  title: {
    fontSize: 22,
    color: '#000',
    fontWeight: 'bold',
  },
  searchWrap: {
    marginTop: 2,
  },
});
