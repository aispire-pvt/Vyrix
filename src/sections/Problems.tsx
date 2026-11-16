import React from 'react';
import { Text, View } from 'react-native';
import { Chamfer } from '../components/Chamfer';
import { Reveal } from '../components/Reveal';
import { PROBLEMS } from '../content';
import { F, Y, useWindowDimensions } from '../theme';
import { s } from '../styles';

export function Problems({ wide, pad }: { wide: boolean; pad: number }) {
  const { width } = useWindowDimensions();
  return (
    <View style={{ paddingHorizontal: pad, paddingTop: wide ? 150 : 75 }}>
      <Reveal>
        <Text style={s.h2}>Your project isn’t empty. <Text style={{ color: Y, fontFamily: F.bi }}>It’s just all over the place.</Text>{'\n'}Turn scattered research into a jury-ready direction.</Text>
      </Reveal>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 36, marginTop: 78, paddingHorizontal: wide ? 13 : 0 }}>
        {PROBLEMS.map(([n, t, d], i) => (
          <Chamfer key={n} color={Y} delay={i * 120} style={{ flexGrow: 1, flexBasis: width >= 1500 ? 0 : width >= 700 ? '40%' : '100%', minHeight: 292 }}>
            <View style={{ padding: 36, paddingTop: 38 }}>
              <Text style={s.num}>{n}</Text>
              <Text style={[s.cardT, { marginTop: 36 }]}>{t}</Text>
              <Text style={s.cardP}>{d}</Text>
            </View>
          </Chamfer>
        ))}
      </View>
    </View>
  );
}
