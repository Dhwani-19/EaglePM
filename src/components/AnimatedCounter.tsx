import { useEffect, useRef, useState } from 'react';

interface AnimatedCounterProps {
  value: number;
  durationMs?: number;
}

export const AnimatedCounter = ({ value, durationMs = 600 }: AnimatedCounterProps) => {
  const [display, setDisplay] = useState<number>(value || 0);
  const startRef = useRef<number>(value || 0);
  const startTimeRef = useRef<number | null>(null);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    const startValue = display;
    const endValue = Number.isFinite(value) ? value : 0;
    startRef.current = startValue;
    startTimeRef.current = null;

    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

    const step = (timestamp: number) => {
      if (startTimeRef.current === null) startTimeRef.current = timestamp;
      const elapsed = timestamp - (startTimeRef.current || 0);
      const progress = Math.min(1, elapsed / durationMs);
      const eased = easeOutCubic(progress);
      const current = Math.round(startValue + (endValue - startValue) * eased);
      setDisplay(current);
      if (progress < 1) {
        frameRef.current = requestAnimationFrame(step);
      }
    };

    frameRef.current = requestAnimationFrame(step);
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return <>{display}</>;
};



