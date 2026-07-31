import { useEffect, useState } from 'react';
import { loadingConfig } from '../models/loadingModel';

export function useLoadingState({ minDurationMs = loadingConfig.minDurationMs } = {}) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const start = performance.now();

    const finishLoading = () => {
      const elapsed = performance.now() - start;
      const remaining = Math.max(minDurationMs - elapsed, 0);
      window.setTimeout(() => setIsLoading(false), remaining);
    };

    if (document.readyState === 'complete') {
      finishLoading();
      return undefined;
    }

    window.addEventListener('load', finishLoading);
    return () => window.removeEventListener('load', finishLoading);
  }, [minDurationMs]);

  return isLoading;
}
