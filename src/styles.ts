import { StyleSheet } from 'react-native';
import { BK, F, W, Y } from './theme';

export const s = StyleSheet.create({
  nav: { color: W, fontFamily: F.sb, fontSize: 18, paddingVertical: 4 },
  navLine: { height: 2, backgroundColor: Y, borderRadius: 1 },
  btn: { height: 51, paddingHorizontal: 46, borderRadius: 26, alignItems: 'center', justifyContent: 'center' },
  btnText: { fontFamily: F.b, fontSize: 16 },
  heroH: { fontFamily: F.display, color: '#1a1a1a', letterSpacing: -1 },
  heroP: { fontFamily: F.m, fontSize: 20, lineHeight: 30, color: '#222', marginTop: 34, maxWidth: 520 },
  heroSmall: { fontFamily: F.r, fontSize: 20, color: '#222', marginTop: 36 },
  h2: { fontFamily: F.b, fontSize: 44, lineHeight: 55, color: W, letterSpacing: -0.5 },
  num: { fontFamily: F.display, fontSize: 20, color: BK },
  cardT: { fontFamily: F.b, fontSize: 22, color: BK },
  cardP: { fontFamily: F.r, fontSize: 18, lineHeight: 27, color: BK, marginTop: 16 },
  eyebrow: { fontFamily: F.sb, fontSize: 20, color: BK },
  check: { fontFamily: F.r, fontSize: 18, lineHeight: 27, color: BK, flex: 1, maxWidth: 610 },
  quoteBox: { backgroundColor: BK, borderRadius: 20, paddingHorizontal: 34, paddingVertical: 40, gap: 46 },
  quote: { fontFamily: F.r, fontSize: 18, lineHeight: 27, color: W },
  stat: { backgroundColor: W, borderRadius: 18, paddingHorizontal: 36, paddingVertical: 28, minHeight: 150 },
  statN: { fontFamily: F.sb, fontSize: 48, color: BK },
  statL: { fontFamily: F.r, fontSize: 18, color: BK, marginTop: 10 },
  review: { backgroundColor: W, borderRadius: 18, paddingHorizontal: 36, paddingTop: 34, paddingBottom: 30 },
  reviewQ: { fontFamily: F.r, fontSize: 18, lineHeight: 25, color: '#222', flexGrow: 1 }, // grows so names line up at the bottom
  reviewName: { fontFamily: F.m, fontSize: 18, color: '#222', marginTop: 40 },
  reviewMeta: { fontFamily: F.r, fontSize: 14, color: '#222', marginTop: 8 },
  fH: { fontFamily: F.b, fontSize: 16, color: BK },
  fT: { fontFamily: F.r, fontSize: 16, color: BK },
  social: { width: 38, height: 38, borderRadius: 8, borderWidth: 1.5, borderColor: BK, alignItems: 'center', justifyContent: 'center' },
});
