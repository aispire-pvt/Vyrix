import React from 'react';
import { Animated, Linking, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useHover } from '../hooks/useHover';
import { BK } from '../theme';
import { s } from '../styles';

export function Social({ icon, url }: { icon: 'logo-instagram' | 'logo-linkedin'; url: string }) {
  const h = useHover(1.12);
  return (
    <Pressable {...h.handlers} onPress={() => Linking.openURL(url)} accessibilityRole="link">
      <Animated.View style={[s.social, h.style]}><Ionicons name={icon} size={19} color={BK} /></Animated.View>
    </Pressable>
  );
}
