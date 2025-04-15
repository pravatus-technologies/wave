import { ViewStyle } from 'react-native';

import { useEffect } from 'react';

import { useDebug } from '@utils/debug/DebugContext';

const colors = [
  '#ff000022',
  '#00ff0022',
  '#0000ff22',
  '#ff00ff22',
  '#00ffff22',
  '#ffff0022',
  '#ffa50022',
  '#80008022',
];

export const useDebugStyle = (enabled?: boolean): ViewStyle | undefined => {
  const { debug, level, increaseLevel, decreaseLevel } = useDebug();

  const active = debug || enabled;

  useEffect(() => {
    if (active) increaseLevel();
    return () => {
      if (active) decreaseLevel();
    };
  }, [active, increaseLevel, decreaseLevel]);

  return active
    ? {
        borderWidth: 1,
        borderColor: colors[level % colors.length],
        backgroundColor: colors[level % colors.length],
      }
    : undefined;
};
