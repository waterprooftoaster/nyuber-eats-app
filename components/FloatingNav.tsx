import { Pressable, View } from 'react-native';
import { router, usePathname } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Circle, Path } from 'react-native-svg';

const BUTTON_DIAMETER = 40;
const ICON_SIZE = 20;
const BUTTON_GAP = 15;
const BOTTOM_OFFSET = 3;

const COLORS = {
  background: '#FFFFFF',
};

function HomeIcon({ active }: { active: boolean }) {
  const fill = active ? 'black' : 'none';
  const stroke = active ? 'black' : '#888888';
  const strokeWidth = active ? 0.5 : 1.5;
  return (
    <Svg width={ICON_SIZE} height={ICON_SIZE} viewBox="0 0 24 24">
      <Path
        d="M12 2 L3 11 V22 H9 V16 H15 V22 H21 V11 Z"
        fill={fill}
        stroke={stroke}
        strokeWidth={strokeWidth}
      />
    </Svg>
  );
}

function CartIcon({ active }: { active: boolean }) {
  const fill = active ? 'black' : 'none';
  const stroke = active ? 'black' : '#888888';
  const strokeWidth = active ? 0.5 : 1.5;
  return (
    <Svg width={ICON_SIZE} height={ICON_SIZE} viewBox="0 0 24 24">
      <Path
        d="M1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96C5 16.1 6.9 18 9 18h12v-2H9.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63H19c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1z"
        fill={fill}
        stroke={stroke}
        strokeWidth={strokeWidth}
      />
      <Circle cx={7} cy={20} r={1.8} fill={fill} stroke={stroke} strokeWidth={strokeWidth} />
      <Circle cx={17} cy={20} r={1.8} fill={fill} stroke={stroke} strokeWidth={strokeWidth} />
    </Svg>
  );
}

function NavButton({
  onPress,
  children,
}: {
  onPress: () => void;
  children: React.ReactNode;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={{
        width: BUTTON_DIAMETER,
        height: BUTTON_DIAMETER,
        borderRadius: BUTTON_DIAMETER / 2,
        backgroundColor: COLORS.background,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.18,
        shadowRadius: 6,
        elevation: 5,
      }}
    >
      {children}
    </Pressable>
  );
}

export default function FloatingNav() {
  const pathname = usePathname();
  const insets = useSafeAreaInsets();
  const isHome = pathname === '/';
  const isCart = pathname === '/cart';

  return (
    <View
      style={{
        position: 'absolute',
        bottom: insets.bottom + BOTTOM_OFFSET,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: BUTTON_GAP,
        pointerEvents: 'box-none',
      }}
    >
      <NavButton onPress={() => { if (!isHome) router.replace('/'); }}>
        <HomeIcon active={isHome} />
      </NavButton>
      <NavButton onPress={() => { if (!isCart) router.replace('/cart'); }}>
        <CartIcon active={isCart} />
      </NavButton>
    </View>
  );
}
