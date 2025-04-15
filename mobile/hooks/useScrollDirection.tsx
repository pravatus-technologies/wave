import React, { createContext, useContext, useRef } from 'react';
import { useSharedValue } from 'react-native-reanimated';

type ScrollDirection = 'up' | 'down';

interface ScrollDirectionContextType {
  direction: { value: ScrollDirection };
  updateDirection: (offsetY: number) => void;
}

const ScrollDirectionContext = createContext<ScrollDirectionContextType | null>(null);

export const ScrollDirectionProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const direction = useSharedValue<ScrollDirection>('up');
  const lastOffset = useRef(0);

  const updateDirection = (offsetY: number): void => {
    if (Math.abs(offsetY - lastOffset.current) < 5) return;
    direction.value = offsetY > lastOffset.current ? 'down' : 'up';
    lastOffset.current = offsetY;
  };

  return (
    <ScrollDirectionContext.Provider value={{ direction, updateDirection }}>
      {children}
    </ScrollDirectionContext.Provider>
  );
};

export const useScrollDirectionContext = (): ScrollDirectionContextType => {
  const ctx = useContext(ScrollDirectionContext);
  if (!ctx)
    throw new Error('useScrollDirectionContext must be used inside ScrollDirectionProvider');
  return ctx;
};
