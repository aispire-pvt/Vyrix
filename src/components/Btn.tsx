import React from 'react';
import { Animated, Pressable, StyleProp, Text, ViewStyle } from 'react-native';
import { useHover } from '../hooks/useHover';
import { s } from '../styles';

export function Btn({ label, bg, color, onPress, style }: { label: string; bg: string; color: string; onPress?: () => void; style?: StyleProp<ViewStyle> }) {
  const h = useHover(1.05);
  return (
    <Pressable {...h.handlers} onPress={onPress} accessibilityRole="button">
      <Animated.View style={[s.btn, { backgroundColor: bg }, h.style, style]}>
        <Text style={[s.btnText, { color }]}>{label}</Text>
      </Animated.View>
    </Pressable>
  );
}
