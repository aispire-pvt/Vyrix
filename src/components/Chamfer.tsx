import React from 'react';
import { Animated, Pressable, StyleProp, View, ViewStyle } from 'react-native';
import { useHover } from '../hooks/useHover';
import { BK } from '../theme';
import { Reveal } from './Reveal';
import { Tri } from './Tri';

// Card with clipped top-right and bottom-left corners; reveals on scroll and lifts on hover.
export function Chamfer({ color, cut = 34, children, style, delay = 0 }: { color: string; cut?: number; children: React.ReactNode; style?: StyleProp<ViewStyle>; delay?: number }) {
  const h = useHover(1.025, 10);
  return (
    <Reveal delay={delay} style={style}>
      <Pressable {...h.handlers} style={{ flex: 1 }}>
        <Animated.View style={[{ backgroundColor: color, flex: 1 }, h.style]}>
          {children}
          <View style={{ position: 'absolute', top: 0, right: 0 }}><Tri w={cut} h={cut} color={BK} dir="tr" /></View>
          <View style={{ position: 'absolute', bottom: 0, left: 0 }}><Tri w={cut} h={cut} color={BK} dir="bl" /></View>
        </Animated.View>
      </Pressable>
    </Reveal>
  );
}
