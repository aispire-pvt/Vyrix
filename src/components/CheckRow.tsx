import React from 'react';
import { Animated, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useReveal } from '../hooks/useReveal';
import { BK } from '../theme';
import { s } from '../styles';

export function CheckRow({ text, delay }: { text: string; delay: number }) {
  const { ref, v } = useReveal(delay);
  return (
    <View ref={ref} style={{ flexDirection: 'row', gap: 20, alignItems: 'flex-start' }}>
      <Animated.View style={{ transform: [{ scale: v.interpolate({ inputRange: [0, 0.6, 1], outputRange: [0, 1.25, 1] }) }] }}>
        <Ionicons name="checkmark-circle" size={28} color={BK} />
      </Animated.View>
      <Animated.Text style={[s.check, { opacity: v, transform: [{ translateX: v.interpolate({ inputRange: [0, 1], outputRange: [-20, 0] }) }] }]}>{text}</Animated.Text>
    </View>
  );
}
