import React from 'react';
import { Image, Text, View } from 'react-native';
import { anchors } from '../anchors';
import { Reveal } from '../components/Reveal';
import { Social } from '../components/Social';
import { F, W } from '../theme';
import { s } from '../styles';

export function Footer({ wide }: { wide: boolean }) {
  return (
    <View ref={(el) => { anchors.footer = el; }} style={{ backgroundColor: W, paddingHorizontal: wide ? 84 : 24, paddingTop: 30, paddingBottom: 20 }}>
      <Reveal style={{ flexDirection: wide ? 'row' : 'column', justifyContent: 'space-between', alignItems: wide ? 'flex-end' : 'flex-start', gap: wide ? 40 : 24 }}>
        <View>
          <Text style={s.fH}>Contact us at</Text>
          <Text style={[s.fT, { marginTop: 8 }]}>support@vyrix.in</Text>
          <Text style={[s.fH, { marginTop: 18 }]}>Socials</Text>
          <View style={{ flexDirection: 'row', gap: 4, marginTop: 10 }}>
            <Social icon="logo-instagram" url="https://www.instagram.com/vyrixbyaispire/" />
            <Social icon="logo-linkedin" url="https://www.linkedin.com/company/vyrix/" />
          </View>
          <Image source={require('../../assets/img/logo.png')} style={{ width: 200, height: 200 * 248 / 1455, marginTop: 20, marginLeft: -4 }} resizeMode="contain" />
          <Text style={[s.fT, { marginTop: 12 }]}>© 2026 Vyrix. All rights reserved.</Text>
        </View>
        <View style={{ flexDirection: 'row', gap: 36 }}>
          <Text style={s.fT}>Privacy Policy</Text>
          <Text style={s.fT}>Terms of use</Text>
        </View>
        <View style={{ alignItems: 'center' }}>
          <Image source={require('../../assets/img/aispire.png')} style={{ width: 140, height: 140 }} resizeMode="contain" />
          <Text style={[s.fT, { marginTop: 2 }]}>A product from <Text style={{ fontFamily: F.b }}>Aispire Private Limited</Text></Text>
          <Text style={[s.fT, { marginTop: 2 }]}>contact@aispire.co.in</Text>
        </View>
      </Reveal>
    </View>
  );
}
