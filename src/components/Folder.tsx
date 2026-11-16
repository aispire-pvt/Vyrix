import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { Tri } from './Tri';

// Card shape: top-left tab + diagonal, body, bottom-right tab + diagonal.
export function Folder({ color, tabW, tabH, bottomH = tabH, diag, bottomW, topLeft, topRight, bottomRight, children, bodyStyle }: {
  color: string; tabW: number; tabH: number; bottomH?: number; diag: number; bottomW: number;
  topLeft?: React.ReactNode; topRight?: React.ReactNode; bottomRight?: React.ReactNode;
  children: React.ReactNode; bodyStyle?: StyleProp<ViewStyle>;
}) {
  return (
    <View>
      <View style={{ flexDirection: 'row', height: tabH }}>
        <View style={{ width: tabW, backgroundColor: color, borderTopLeftRadius: 28, justifyContent: 'center' }}>{topLeft}</View>
        <View style={{ marginLeft: -1 }}><Tri w={diag} h={tabH + 1} color={color} dir="bl" /></View>
        <View style={{ flex: 1, justifyContent: 'center' }}>{topRight}</View>
      </View>
      <View style={[{ backgroundColor: color, borderTopRightRadius: 28, borderBottomLeftRadius: 28, marginTop: -1 }, bodyStyle]}>{children}</View>
      <View style={{ flexDirection: 'row', height: bottomH, marginTop: -1 }}>
        <View style={{ flex: 1 }} />
        <View style={{ marginRight: -1, zIndex: 1 }}><Tri w={diag} h={bottomH} color={color} dir="tr" /></View>
        <View style={{ width: bottomW, backgroundColor: color, borderBottomRightRadius: 28, alignItems: 'center', justifyContent: 'center' }}>{bottomRight}</View>
      </View>
    </View>
  );
}
