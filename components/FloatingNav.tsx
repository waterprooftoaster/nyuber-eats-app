import { Pressable, View } from 'react-native';
import { router, usePathname } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';

const BUTTON_DIAMETER = 56;
const ICON_SIZE = 24;
const BUTTON_GAP = 20;
const BOTTOM_OFFSET = 24;

const COLORS = {
  activeBackground: '#000000',
  inactiveBackground: '#F2F2F2',
  activeIcon: '#FFFFFF',
  inactiveIcon: '#222222',
};

// Traced from Uber Eats iOS — filled house shape (roof + walls + door cutout)
function HomeIcon({ color }: { color: string }) {
  return (
    <Svg width={ICON_SIZE} height={ICON_SIZE} viewBox="0 0 24 24">
      <Path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" fill={color} />
    </Svg>
  );
}

// Traced from Uber Eats iOS — shopping bag with U-handle and rectangular body
function CartIcon({ color }: { color: string }) {
  return (
    <Svg width={ICON_SIZE} height={ICON_SIZE} viewBox="0 0 24 24">
      <Path
        d="M18 6h-2c0-2.21-1.79-4-4-4S8 3.79 8 6H6c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-6-2c1.1 0 2 .9 2 2h-4c0-1.1.9-2 2-2z"
        fill={color}
      />
    </Svg>
  );
}

function NavButton({
  onPress,
  isActive,
  children,
}: {
  onPress: () => void;
  isActive: boolean;
  children: React.ReactNode;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={{
        width: BUTTON_DIAMETER,
        height: BUTTON_DIAMETER,
        borderRadius: BUTTON_DIAMETER / 2,
        backgroundColor: isActive ? COLORS.activeBackground : COLORS.inactiveBackground,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 4,
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
      <NavButton onPress={() => { if (!isHome) router.replace('/'); }} isActive={isHome}>
        <HomeIcon color={isHome ? COLORS.activeIcon : COLORS.inactiveIcon} />
      </NavButton>
      <NavButton onPress={() => { if (!isCart) router.replace('/cart'); }} isActive={isCart}>
        <CartIcon color={isCart ? COLORS.activeIcon : COLORS.inactiveIcon} />
      </NavButton>
    </View>
  );
}
