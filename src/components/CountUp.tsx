import React, { useEffect, useState } from 'react';
import { Animated, Easing, Text, View } from 'react-native';
import { useReveal } from '../hooks/useReveal';

export function CountUp({ to, suffix, style }: { to: number; suffix: string; style: any }) {
  const { ref, shown } = useReveal();
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!shown) return;
    const v = new Animated.Value(0);
    const id = v.addListener(({ value }) => setN(Math.round(value)));
    Animated.timing(v, { toValue: to, duration: 1000, easing: Easing.out(Easing.cubic), useNativeDriver: false }).start();
    return () => v.removeListener(id);
  }, [shown]);
  return <View ref={ref}><Text style={style}>{n}{suffix}</Text></View>;
}
