import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { Animated, Easing } from 'react-native';
import { ND } from '../theme';

export type Check = (vh: number) => void;
export const RevealCtx = createContext<{ add: (c: Check) => () => void; vh: number }>({ add: () => () => {}, vh: 800 });

const DURATION = 450;    // reveal animation length (ms)
const DELAY_SCALE = 0.5; // shortens every stagger delay passed in by callers
const TRIGGER = 0.95;    // reveal once the element's top passes 95% of the viewport height

export function useReveal(delay = 0) {
  const { add, vh } = useContext(RevealCtx);
  const ref = useRef<any>(null);
  const v = useRef(new Animated.Value(0)).current;
  const [shown, setShown] = useState(false);
  useEffect(() => {
    let done = false;
    const check: Check = (h) => {
      if (done) return;
      ref.current?.measureInWindow((_x: number, y: number) => {
        if (!done && y < h * TRIGGER) {
          done = true;
          setShown(true);
          Animated.timing(v, { toValue: 1, duration: DURATION, delay: delay * DELAY_SCALE, easing: Easing.out(Easing.cubic), useNativeDriver: ND }).start();
          off();
        }
      });
    };
    const off = add(check);
    const t = setTimeout(() => check(vh), 30);
    return () => { clearTimeout(t); off(); };
  }, []);
  return { ref, v, shown };
}
