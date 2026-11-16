import { useRef } from 'react';
import { Animated } from 'react-native';
import { ND } from '../theme';

export function useHover(scaleTo = 1.04, lift = 0) {
  const v = useRef(new Animated.Value(0)).current;
  const go = (to: number) => Animated.spring(v, { toValue: to, useNativeDriver: ND, friction: 7, tension: 180 }).start();
  return {
    handlers: { onHoverIn: () => go(1), onHoverOut: () => go(0), onPressIn: () => go(-0.6), onPressOut: () => go(0) },
    style: {
      transform: [
        { scale: v.interpolate({ inputRange: [-1, 0, 1], outputRange: [2 - scaleTo, 1, scaleTo] }) },
        { translateY: v.interpolate({ inputRange: [-1, 0, 1], outputRange: [0, 0, -lift] }) },
      ],
    },
  };
}
