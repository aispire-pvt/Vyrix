import React, { useRef } from 'react';
import { Animated, Easing, Pressable, Text } from 'react-native';
import { F, ND } from '../theme';
import { s } from '../styles';

export function NavLink({ label, bold, onPress }: { label: string; bold?: boolean; onPress?: () => void }) {
  const v = useRef(new Animated.Value(0)).current;
  const go = (to: number) => Animated.timing(v, { toValue: to, duration: 160, easing: Easing.out(Easing.quad), useNativeDriver: ND }).start();
  return (
    <Pressable onHoverIn={() => go(1)} onHoverOut={() => go(0)} onPress={onPress} accessibilityRole="link">
      <Text style={[s.nav, bold && { fontFamily: F.b }]}>{label}</Text>
      <Animated.View style={[s.navLine, { transform: [{ scaleX: v }] }]} />
    </Pressable>
  );
}
