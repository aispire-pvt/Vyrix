export type Section = 'hero' | 'features' | 'mentor' | 'trust' | 'footer';
export const NAV = [['Product', 'hero'], ['Features', 'features'], ['AI', 'mentor'], ['Reviews', 'trust']] as const;
// Headings the nav links scroll to: empty markers placed right above each heading, outside its Reveal transform.
export const anchors: Partial<Record<Exclude<Section, 'hero'>, any>> = {};
