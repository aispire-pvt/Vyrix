import { Platform, useWindowDimensions as useRawDimensions } from 'react-native';

export const Y = '#FCD400';
export const BK = '#000';
export const W = '#fff';
export const F = {
  display: 'Unbounded_800ExtraBold',
  r: 'PlusJakartaSans_400Regular',
  m: 'PlusJakartaSans_500Medium',
  sb: 'PlusJakartaSans_600SemiBold',
  b: 'PlusJakartaSans_700Bold',
  bi: 'PlusJakartaSans_700Bold_Italic',
};
export const ND = true; // useNativeDriver — ignored on web, real perf win on device

// Desktop web renders at 80% (like browser zoom 80%). Layout code sees the zoomed-out CSS width.
// Height and measureInWindow stay in on-screen px; scroll offsets are CSS px (divide screen px by the zoom).
export const zoomFor = (w: number) => (Platform.OS === 'web' && w >= 768 ? 0.8 : 1);
export function useWindowDimensions() {
  const { width, height } = useRawDimensions();
  return { width: width / zoomFor(width), height };
}
