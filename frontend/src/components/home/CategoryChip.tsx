import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export type Category = {
  id: string;
  title: string;
};

type Props = {
  item: Category;
  onPress: () => void;
  isSelected: boolean;
};

export default function CategoryChip({ item, onPress, isSelected }: Props) {
  const backgroundColor = isSelected ? '#FF6A00' : '#c8c8c8ff';
  const textColor = isSelected ? 'white' : 'black';

  return (
    <TouchableOpacity onPress={onPress} style={[styles.item, { backgroundColor }]}>
      <Text style={[styles.title, { color: textColor }]}>{item.title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  item: {
    paddingHorizontal: 18,
    paddingVertical: 12,
    marginVertical: 8,
    marginHorizontal: 10,
    borderRadius: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
});
