import React, { useEffect, useRef } from 'react';
import { Platform, ScrollView, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import { anchors, Section } from './src/anchors';
import { StickyNav } from './src/components/StickyNav';
import { Check, RevealCtx } from './src/hooks/useReveal';
import { Features } from './src/sections/Features';
import { Footer } from './src/sections/Footer';
import { Hero } from './src/sections/Hero';
import { Mentor } from './src/sections/Mentor';
import { Problems } from './src/sections/Problems';
import { Trust } from './src/sections/Trust';
import { BK, Y, useWindowDimensions, zoomFor } from './src/theme';

// Web-only scrollbar in the site's colours: yellow pill thumb on a black track.
// Chromium/Safari use the ::-webkit-scrollbar rules; Firefox (no webkit pseudo-elements) gets scrollbar-color.
const SCROLLBAR_CSS = `
::-webkit-scrollbar { width: 12px; height: 12px; }
::-webkit-scrollbar-track { background: ${BK}; }
::-webkit-scrollbar-thumb { background: ${Y}; border-radius: 12px; border: 3px solid ${BK}; }
::-webkit-scrollbar-thumb:hover { background: #ffe14d; }
::-webkit-scrollbar-corner { background: ${BK}; }
@supports not selector(::-webkit-scrollbar) { * { scrollbar-color: ${Y} ${BK}; } }
`;

const getSvgFaviconUri = (dark: boolean) =>
  `data:image/svg+xml,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <style>
    .vyrix-mark { fill: ${dark ? '#ffffff' : '#000000'}; }
    @media (prefers-color-scheme: dark) {
      .vyrix-mark { fill: #ffffff; }
    }
  </style>
  <polygon class="vyrix-mark" points="212.6,243.2 378.0,243.2 476.0,139.1 309.6,139.1" />
  <polygon class="vyrix-mark" points="36.0,139.1 157.5,139.1 234.1,199.3 186.1,255.5 304.5,255.5 339.2,284.1 254.5,372.9 36.0,196.3" />
</svg>
`.trim())}`;

export default function App() {
  // Fonts live in assets/fonts (not node_modules): Vercel drops node_modules paths from the deployed output.
  const [loaded] = useFonts({
    Unbounded_800ExtraBold: require('./assets/fonts/Unbounded_800ExtraBold.ttf'),
    PlusJakartaSans_400Regular: require('./assets/fonts/PlusJakartaSans_400Regular.ttf'),
    PlusJakartaSans_500Medium: require('./assets/fonts/PlusJakartaSans_500Medium.ttf'),
    PlusJakartaSans_600SemiBold: require('./assets/fonts/PlusJakartaSans_600SemiBold.ttf'),
    PlusJakartaSans_700Bold: require('./assets/fonts/PlusJakartaSans_700Bold.ttf'),
    PlusJakartaSans_700Bold_Italic: require('./assets/fonts/PlusJakartaSans_700Bold_Italic.ttf'),
    ionicons: require('./assets/fonts/Ionicons.ttf'), // pre-registers Ionicons so it never fetches its node_modules copy
  });
  const { width, height } = useWindowDimensions();
  useEffect(() => {
    if (Platform.OS === 'web') (document.documentElement.style as any).zoom = String(zoomFor(window.innerWidth));
  }, [width]);
  useEffect(() => {
    if (Platform.OS !== 'web') return;
    const el = document.createElement('style');
    el.textContent = SCROLLBAR_CSS;
    document.head.appendChild(el);

    // Adaptive SVG favicon: switches between black (light mode) and white (dark mode)
    const matcher = window.matchMedia('(prefers-color-scheme: dark)');
    let link = document.querySelector<HTMLLinkElement>("link[rel~='icon'][type='image/svg+xml']");
    if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      link.type = 'image/svg+xml';
      document.head.appendChild(link);
    }
    const updateFavicon = () => {
      if (link) link.href = getSvgFaviconUri(matcher.matches);
    };
    updateFavicon();
    matcher.addEventListener?.('change', updateFavicon);

    return () => {
      el.remove();
      matcher.removeEventListener?.('change', updateFavicon);
    };
  }, []);

  const checks = useRef(new Set<Check>()).current;
  const scroll = useRef<any>(null);
  const content = useRef<any>(null);
  const go = (k: Section) => {
    if (k === 'hero') return scroll.current?.scrollTo({ y: 0, animated: true });
    const w = width >= 1100;
    const headerH = w ? 104 : 72;
    const z = Platform.OS === 'web' ? zoomFor(window.innerWidth) : 1;
    // measured at click time (onLayout doesn't fire reliably on web): heading's offset inside the scroll content
    content.current?.measureInWindow((_cx: number, cy: number) => anchors[k]?.measureInWindow((_x: number, sy: number) => {
      const y = (sy - cy) / z - headerH - 40; // heading sits 40px under the sticky header
      scroll.current?.scrollTo({ y: Math.max(0, y), animated: true });
    }));
  };
  const ctx = useRef({
    add: (c: Check) => { checks.add(c); return () => { checks.delete(c); }; },
    vh: height,
  }).current;
  ctx.vh = height;

  if (!loaded) return <View style={{ flex: 1, backgroundColor: BK }} />;
  const wide = width >= 1100;
  const pad = wide ? width * 0.1 : 20;
  return (
    <RevealCtx.Provider value={ctx}>
      <StatusBar style="light" />
      <View style={{ flex: 1, backgroundColor: BK }}>
        <ScrollView ref={scroll} style={{ flex: 1 }} scrollEventThrottle={16}
          onScroll={() => checks.forEach((c) => c(height))}>
          <View ref={content}>
            <Hero wide={wide} />
            <Problems wide={wide} pad={pad} />
            <Features wide={wide} pad={pad} />
            <Mentor wide={wide} />
            <Trust wide={wide} pad={pad} />
            <Footer wide={wide} />
          </View>
        </ScrollView>
        <StickyNav wide={wide} go={go} />
      </View>
    </RevealCtx.Provider>
  );
}
