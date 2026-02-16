import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export type Category = {
  id: string;
  title: string;
  filter?: ((restaurant: any) => boolean) | null;
};

type Props = {
  item: Category;
  onPress: () => void;
  isSelected: boolean;
};

export default function CategoryChip({ item, onPress, isSelected }: Props) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.item,
        { backgroundColor: isSelected ? '#FF6A00' : '#F0F0F0' },
      ]}
      activeOpacity={0.7}
    >
      <Text
        style={[
          styles.title,
          { color: isSelected ? '#FFFFFF' : '#333333' },
        ]}
      >
        {item.title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  item: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginRight: 12,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
  },
});
