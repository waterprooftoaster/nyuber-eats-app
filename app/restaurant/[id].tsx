import { FlatList, ScrollView, Text, View, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams } from 'expo-router';
import { RESTAURANTS, MenuItem } from '../../data/mock-restaurants';

const COLORS = {
  background: '#FFFFFF',
  textPrimary: '#000000',
  textSecondary: '#545454',
  border: '#EEEEEE',
  placeholder: '#E0E0E0',
};

const SIDE_PADDING = 16;
const COLUMN_GAP = 8;

function MenuItemCell({ item, columnWidth }: { item: MenuItem; columnWidth: number }) {
  return (
    <View style={{ width: columnWidth }}>
      <View
        style={{
          width: columnWidth,
          height: columnWidth,
          backgroundColor: COLORS.placeholder,
          borderRadius: 8,
          marginBottom: 6,
        }}
      />
      <Text
        style={{ fontSize: 15, fontWeight: '600', color: COLORS.textPrimary, marginBottom: 2 }}
        numberOfLines={2}
      >
        {item.name}
      </Text>
      <Text style={{ fontSize: 14, color: COLORS.textSecondary }}>
        ${item.price.toFixed(2)}
      </Text>
    </View>
  );
}

export default function RestaurantDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { width: screenWidth } = useWindowDimensions();

  const restaurant = RESTAURANTS.find((r) => r.id === id);

  const columnWidth = (screenWidth - SIDE_PADDING * 2 - COLUMN_GAP) / 2;

  if (!restaurant) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.background }}>
        <Text style={{ padding: 16, color: COLORS.textSecondary }}>Restaurant not found.</Text>
      </SafeAreaView>
    );
  }

  return (
    <ScrollView style={{ flex: 1, backgroundColor: COLORS.background }}>
      {/* Hero */}
      <View
        style={{
          width: '100%',
          height: 220,
          backgroundColor: COLORS.placeholder,
        }}
      />

      {/* Restaurant info */}
      <View style={{ padding: SIDE_PADDING, paddingTop: 12, paddingBottom: 8 }}>
        <Text
          style={{ fontSize: 22, fontWeight: '700', color: COLORS.textPrimary, marginBottom: 4, textAlign: 'center' }}
        >
          {restaurant.name}
        </Text>
        <Text style={{ fontSize: 14, color: COLORS.textSecondary, marginBottom: 4 }}>
          {restaurant.address}
        </Text>
      </View>

      {/* Menu grid */}
      <FlatList
        data={restaurant.menuItems}
        keyExtractor={(item) => item.id}
        numColumns={2}
        scrollEnabled={false}
        columnWrapperStyle={{ gap: COLUMN_GAP }}
        contentContainerStyle={{ gap: COLUMN_GAP, padding: SIDE_PADDING }}
        renderItem={({ item }) => <MenuItemCell item={item} columnWidth={columnWidth} />}
      />
    </ScrollView>
  );
}
