import React from 'react';
import { View } from 'react-native';
import { NAV, Section } from '../anchors';
import { BK, useWindowDimensions } from '../theme';
import { NavLink } from './NavLink';
import { Tri } from './Tri';

// Only the black part of the header sticks: overlays that cover everything except the white logo tab,
// so the logo tab scrolls away with the page while the nav stays pinned.
export function StickyNav({ wide, go }: { wide: boolean; go: (k: Section) => void }) {
  const { width } = useWindowDimensions();
  const top = wide ? 22 : 8;
  const tabEnd = wide ? 42 + 345 : 12 + 190; // where the white logo tab ends and its diagonal starts
  const diag = wide ? 80 : 50;
  const tabH = wide ? 82 : 64;
  return (
    <>
      {/* black strip above the logo tab, so content never shows over the header's top edge */}
      <View style={{ position: 'absolute', top: 0, left: 0, width: tabEnd, height: top, backgroundColor: BK }} pointerEvents="none" />
      {/* black wedge above the logo tab's diagonal: mirrors the white Tri underneath */}
      <View style={{ position: 'absolute', top: 0, left: tabEnd - 1, width: diag + 1 }} pointerEvents="none">
        <View style={{ height: top, backgroundColor: BK }} />
        <Tri w={diag} h={tabH + 1} color={BK} dir="tr" />
      </View>
      <View style={{
        position: 'absolute', top: 0, right: 0, left: tabEnd + diag - 1,
        height: top + tabH, paddingTop: top, backgroundColor: BK, flexDirection: 'row', alignItems: 'center',
        paddingRight: wide ? 82 : 28,
      }}>
        {wide && (
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', gap: width > 1500 ? 88 : 48, paddingBottom: 8 }}>
            {NAV.map(([l, k]) => <NavLink key={l} label={l} onPress={() => go(k)} />)}
          </View>
        )}
        <View style={{ flex: wide ? undefined : 1, alignItems: 'flex-end', paddingBottom: 8 }}>
          <NavLink label="Contact Us" bold onPress={() => go('footer')} />
        </View>
      </View>
    </>
  );
}
