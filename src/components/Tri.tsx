import React from 'react';
import { View, ViewStyle } from 'react-native';

// Right-angle triangles used for the "folder tab" diagonals and chamfered corners.
export function Tri({ w, h, color, dir }: { w: number; h: number; color: string; dir: 'bl' | 'tr' | 'tl' | 'br' }) {
  const t = 'transparent';
  const m: Record<string, ViewStyle> = {
    bl: { borderBottomWidth: h, borderBottomColor: color, borderRightWidth: w, borderRightColor: t }, // ◣
    tr: { borderTopWidth: h, borderTopColor: color, borderLeftWidth: w, borderLeftColor: t },         // ◥
    tl: { borderTopWidth: h, borderTopColor: color, borderRightWidth: w, borderRightColor: t },       // ◤
    br: { borderBottomWidth: h, borderBottomColor: color, borderLeftWidth: w, borderLeftColor: t },   // ◢
  };
  return <View style={[{ width: 0, height: 0 }, m[dir]]} />;
}
