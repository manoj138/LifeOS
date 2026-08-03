import React, { useEffect, useState } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';

export const AnimatedCounter = ({ value, duration = 1.5, prefix = "", suffix = "" }) => {
  const spring = useSpring(0, { duration: duration * 1000, bounce: 0 });
  const display = useTransform(spring, (current) =>
    Math.floor(current).toLocaleString()
  );

  const [currentValue, setCurrentValue] = useState(prefix + "0" + suffix);

  useEffect(() => {
    spring.set(value);
  }, [spring, value]);

  useEffect(() => {
    return display.on("change", (latest) => {
      setCurrentValue(prefix + latest + suffix);
    });
  }, [display, prefix, suffix]);

  return <span>{currentValue}</span>;
};
