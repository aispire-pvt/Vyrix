import React from 'react';
import { Text, View } from 'react-native';
import { anchors } from '../anchors';
import { CountUp } from '../components/CountUp';
import { HoverCard } from '../components/HoverCard';
import { Reveal } from '../components/Reveal';
import { REVIEWS, STATS } from '../content';
import { W } from '../theme';
import { s } from '../styles';

export function Trust({ wide, pad }: { wide: boolean; pad: number }) {
  return (
    <View style={{ paddingHorizontal: pad, paddingTop: wide ? 285 : 90, paddingBottom: wide ? 270 : 90 }}>
      <View ref={(el) => { anchors.trust = el; }} />
      <Reveal><Text style={[s.eyebrow, { color: W }]}>TRUSTED BY STUDENTS</Text></Reveal>
      <Reveal delay={100}><Text style={[s.h2, { marginTop: 8 }]}>Already shaping stronger projects</Text></Reveal>
      <View style={{ flexDirection: wide ? 'row' : 'column', gap: 45, marginTop: 44 }}>
        {STATS.map(([n, suf, label], i) => (
          <Reveal key={label} delay={i * 130} style={{ flex: wide ? 1 : undefined, marginTop: wide ? i * 8 : 0 }}>
            <HoverCard style={s.stat}>
              <CountUp to={n} suffix={suf} style={s.statN} />
              <Text style={s.statL}>{label}</Text>
            </HoverCard>
          </Reveal>
        ))}
      </View>
      {/* testimonials: same top edge and stretched to the taller card's height */}
      <View style={{ flexDirection: wide ? 'row' : 'column', gap: 48, marginTop: 32 }}>
        {REVIEWS.map(([q, name, meta], i) => (
          <Reveal key={name} delay={i * 160} style={{ flex: wide ? 1 : undefined }}>
            <HoverCard style={s.review} fill={wide}>
              <Text style={s.reviewQ}>{q}</Text>
              <Text style={s.reviewName}>{name}</Text>
              <Text style={s.reviewMeta}>{meta}</Text>
            </HoverCard>
          </Reveal>
        ))}
      </View>
    </View>
  );
}
