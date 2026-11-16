import React, { useEffect, useRef } from 'react';
import { Animated, Easing, Image, Linking, Text, View } from 'react-native';
import { Btn } from '../components/Btn';
import { Folder } from '../components/Folder';
import { BK, F, ND, W, Y, useWindowDimensions } from '../theme';
import { s } from '../styles';

export function Hero({ wide }: { wide: boolean }) {
  const { width } = useWindowDimensions();
  const intro = useRef([0, 1, 2, 3, 4, 5].map(() => new Animated.Value(0))).current;
  const art = useRef(new Animated.Value(0)).current;
  const float = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.stagger(60, intro.map((v) => Animated.timing(v, { toValue: 1, duration: 550, easing: Easing.out(Easing.exp), useNativeDriver: ND }))).start();
    Animated.timing(art, { toValue: 1, duration: 750, delay: 150, easing: Easing.out(Easing.back(1.2)), useNativeDriver: ND }).start();
    Animated.loop(Animated.sequence([
      Animated.timing(float, { toValue: 1, duration: 2600, easing: Easing.inOut(Easing.sin), useNativeDriver: ND }),
      Animated.timing(float, { toValue: 0, duration: 2600, easing: Easing.inOut(Easing.sin), useNativeDriver: ND }),
    ])).start();
  }, []);
  const up = (v: Animated.Value) => ({
    opacity: v,
    transform: [{ translateY: v.interpolate({ inputRange: [0, 1], outputRange: [40, 0] }) }],
  });
  // explicit size: RN-web Image ignores aspectRatio and falls back to intrinsic height
  const artW = wide ? Math.min(690, (width - 84 - 340 - 30) / 2) : Math.min(690, width - 72);
  const hSize = wide ? Math.min(80, width / 22) : Math.min(52, width / 8.5);
  const logo = <Image source={require('../../assets/img/logo.png')} style={{ width: wide ? 192 : 140, height: (wide ? 192 : 140) * 248 / 1455, marginLeft: wide ? 75 : 24, marginTop: 6 }} resizeMode="contain" />;
  return (
    <View style={{ paddingHorizontal: wide ? 42 : 12, paddingTop: wide ? 22 : 8 }}>
      <Folder color={W} tabW={wide ? 345 : 190} tabH={wide ? 82 : 64} bottomH={wide ? 104 : 84} diag={wide ? 80 : 50} bottomW={wide ? 342 : 230}
        topLeft={logo}
        bottomRight={<Btn label="See what’s new" bg={BK} color={W} style={{ width: wide ? 242 : 200, height: 58, marginTop: 4 }} />}
        bodyStyle={{ flexDirection: wide ? 'row' : 'column', alignItems: 'center', paddingVertical: wide ? 90 : 40, paddingHorizontal: wide ? width * 0.088 : 24, gap: 30 }}>
        <View style={{ flex: wide ? 1 : undefined, alignSelf: 'stretch', justifyContent: 'center' }}>
          {['Get your', 'project', 'jury-ready'].map((t, i) => (
            <Animated.Text key={t} style={[s.heroH, { fontSize: hSize, lineHeight: hSize * 0.98 }, up(intro[i])]}>{t}</Animated.Text>
          ))}
          <Animated.Text style={[s.heroP, up(intro[3])]}>A research workspace for design students. Research, organise, validate and move forward before jury day.</Animated.Text>
          <Animated.View style={[{ flexDirection: 'row', flexWrap: 'wrap', gap: 15, marginTop: 34 }, up(intro[4])]}>
            <Btn label="Sign up for free" bg={Y} color={BK} onPress={() => Linking.openURL('https://app.vyrix.in/signup')} />
            <Btn label="Log into Beta 2" bg={BK} color={W} onPress={() => Linking.openURL('https://app.vyrix.in/login')} />
          </Animated.View>
          <Animated.Text style={[s.heroSmall, up(intro[5])]}><Text style={{ fontFamily: F.m }}>250+</Text> design students are already using it</Animated.Text>
        </View>
        <Animated.View style={{
          flex: wide ? 1 : undefined, width: wide ? undefined : '100%', alignItems: 'center',
          opacity: art,
          transform: [
            { scale: art.interpolate({ inputRange: [0, 1], outputRange: [0.85, 1] }) },
            { translateY: float.interpolate({ inputRange: [0, 1], outputRange: [0, -14] }) },
          ],
        }}>
          <Image source={require('../../assets/img/hero.png')} style={{ width: artW, height: artW * 1086 / 1448 }} resizeMode="contain" />
        </Animated.View>
      </Folder>
    </View>
  );
}
