import { Text, View } from 'react-native';

const COLORS = {
  background: '#FFFFFF',
  textPrimary: '#000000',
};

export default function CartScreen() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.background,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text style={{ fontSize: 24, fontWeight: '700', color: COLORS.textPrimary }}>
        Cart
      </Text>
    </View>
  );
}
