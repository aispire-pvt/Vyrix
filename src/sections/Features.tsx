import React from 'react';
import { Text, View } from 'react-native';
import { anchors } from '../anchors';
import { Chamfer } from '../components/Chamfer';
import { Reveal } from '../components/Reveal';
import { FEATURES } from '../content';
import { Y } from '../theme';
import { s } from '../styles';

export function Features({ wide, pad }: { wide: boolean; pad: number }) {
  return (
    <View style={{ paddingHorizontal: pad, paddingTop: wide ? 315 : 90 }}>
      <View ref={(el) => { anchors.features = el; }} />
      <Reveal>
        <Text style={s.h2}>How Vyrix helps: from scattered work to a{'\n'}<Text style={{ color: Y }}>research-forward direction</Text></Text>
      </Reveal>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 38, marginTop: 66, paddingHorizontal: wide ? 13 : 0 }}>
        {FEATURES.map(([n, t, d, items, c], i) => (
          <Chamfer key={n} color={c} delay={(i % 2) * 150} style={{ flexBasis: wide ? '47%' : '100%', flexGrow: 1, minHeight: 290 }}>
            <View style={{ padding: 58, paddingTop: 38 }}>
              <Text style={s.num}>{n}</Text>
              <Text style={[s.cardT, { marginTop: i < 2 ? 46 : 54 }]}>{t}</Text>
              <Text style={[s.cardP, { marginTop: 22 }]}>{d}</Text>
              {items.map((it) => <Text key={it} style={[s.cardP, { marginTop: 0, paddingLeft: 10 }]}>{'•  '}{it}</Text>)}
            </View>
          </Chamfer>
        ))}
      </View>
    </View>
  );
}
