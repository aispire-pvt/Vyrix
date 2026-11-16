import React from 'react';
import { Text, View } from 'react-native';
import { anchors } from '../anchors';
import { CheckRow } from '../components/CheckRow';
import { Folder } from '../components/Folder';
import { Reveal } from '../components/Reveal';
import { CHECKS, QUOTES } from '../content';
import { BK, F, Y } from '../theme';
import { s } from '../styles';

export function Mentor({ wide }: { wide: boolean }) {
  return (
    <View style={{ paddingHorizontal: wide ? 117 : 12, paddingTop: wide ? 285 : 90 }}>
      <View ref={(el) => { anchors.mentor = el; }} />
      <Reveal from={80}>
        <Folder color={Y} tabW={wide ? 315 : 160} tabH={wide ? 75 : 56} diag={wide ? 80 : 50} bottomW={wide ? 312 : 140}
          bodyStyle={{ flexDirection: wide ? 'row' : 'column', paddingHorizontal: wide ? 110 : 24, paddingTop: wide ? 30 : 20, paddingBottom: wide ? 80 : 40, gap: 40, alignItems: wide ? 'flex-end' : 'stretch' }}>
          <View style={{ flex: wide ? 1 : undefined, maxWidth: 760 }}>
            <Reveal delay={100}><Text style={s.eyebrow}>YOUR PROJECT MENTOR</Text></Reveal>
            <Reveal delay={200}><Text style={[s.h2, { color: BK, marginTop: 8 }]}>An AI that guides, not just generates</Text></Reveal>
            <Reveal delay={300}><Text style={[s.heroP, { marginTop: 22, fontFamily: F.r }]}>Your project deserves a second mind. Vyrix AI helps you examine your thinking, spot contradictions and ask the questions you should ask before jury.</Text></Reveal>
            <View style={{ marginTop: 34, gap: 26 }}>
              {CHECKS.map((c, i) => <CheckRow key={i} text={c} delay={450 + i * 150} />)}
            </View>
          </View>
          <Reveal delay={350} from={60} style={{ flex: wide ? 0.82 : undefined }}>
            <View style={s.quoteBox}>
              {QUOTES.map((q, i) => <Reveal key={i} delay={600 + i * 300} from={16}><Text style={s.quote}>{q}</Text></Reveal>)}
            </View>
          </Reveal>
        </Folder>
      </Reveal>
    </View>
  );
}
