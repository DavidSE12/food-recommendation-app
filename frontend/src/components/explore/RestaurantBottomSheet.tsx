import React, { useMemo, useRef } from "react";
import { View, Text, StyleSheet } from "react-native";
import BottomSheet from '@gorhom/bottom-sheet';
import RestaurantCard from "./RestaurantCard";
import {Restaurant} from '@/app/(tabs)/explore';

type Props = {
  restaurants: Restaurant[];
  loading?: boolean;
  onSelect?: (restaurant: Restaurant) => void;
  initialIndex?: number; // default middle snap */
};

export default function RestaurantsBottomSheet({
  restaurants = [],
  loading = false,
  onSelect,
  initialIndex = 1,
}: Props) {
  // const sheetRef = useRef<BottomSheet>(null);

  // collapsed -> half -> almost full
  const snapPoints = useMemo(() => ["18%", "45%", "85%"], []);

   return (
    <BottomSheet
    snapPoints = {snapPoints}>
      <View>
        <Text>PLease workkk</Text>
      </View>
    </BottomSheet>
    );
  }

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: '#333',
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 30,
    paddingTop: 8,
  },
  emptyContainer: {
    padding: 40,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
  },
});