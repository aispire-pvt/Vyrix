import React from 'react';
import { Animated, Pressable, StyleProp, ViewStyle } from 'react-native';
import { useHover } from '../hooks/useHover';

// fill: stretch to the parent's height (used so cards in one row come out the same height).
export function HoverCard({ children, style, fill }: { children: React.ReactNode; style: StyleProp<ViewStyle>; fill?: boolean }) {
  const h = useHover(1.02, 8);
  return (
    <Pressable {...h.handlers} style={fill && { flex: 1 }}>
      <Animated.View style={[style, fill && { flex: 1 }, h.style]}>{children}</Animated.View>
    </Pressable>
  );
}
