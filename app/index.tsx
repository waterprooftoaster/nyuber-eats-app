import { FlatList, Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { RESTAURANTS, Restaurant } from '../data/mock-restaurants';

const COLORS = {
  background: '#FFFFFF',
  textPrimary: '#000000',
  textSecondary: '#545454',
  border: '#EEEEEE',
  placeholder: '#E0E0E0',
};

const CARD_WIDTH = 230;
const CARD_SPACING = 12;

function RestaurantCard({ item }: { item: Restaurant }) {
  return (
    <Pressable
      onPress={() => router.push(`/restaurant/${item.id}`)}
      style={{ width: CARD_WIDTH, alignSelf: 'flex-start' }}
    >
      <View
        style={{
          width: CARD_WIDTH,
          height: 130,
          backgroundColor: COLORS.placeholder,
          borderRadius: 8,
        }}
      />
      <View style={{ padding: 8, paddingTop: 8 }}>
        <Text
          style={{
            fontSize: 14,
            fontWeight: '700',
            color: COLORS.textPrimary,
            marginBottom: 4,
          }}
          numberOfLines={1}
        >
          {item.name}
        </Text>
      </View>
    </Pressable>
  );
}

export default function HomeScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.background }}>
      <FlatList
        data={RESTAURANTS}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingLeft: 16, paddingRight: 16 }}
        ItemSeparatorComponent={() => <View style={{ width: CARD_SPACING }} />}
        renderItem={({ item }) => <RestaurantCard item={item} />}
      />
    </SafeAreaView>
  );
}
