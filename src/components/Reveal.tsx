import React from 'react';
import { Animated, StyleProp, ViewStyle } from 'react-native';
import { useReveal } from '../hooks/useReveal';

// Fades and slides its children up once they scroll into view.
export function Reveal({ children, delay = 0, from = 40, style }: { children: React.ReactNode; delay?: number; from?: number; style?: StyleProp<ViewStyle> }) {
  const { ref, v } = useReveal(delay);
  return (
    <Animated.View ref={ref} style={[style, {
      opacity: v,
      transform: [{ translateY: v.interpolate({ inputRange: [0, 1], outputRange: [from, 0] }) }],
    }]}>
      {children}
    </Animated.View>
  );
}
