import React, { createContext, useContext, useState } from "react";

type DebugContextType = {
  debug: boolean;
  toggleDebug: () => void;
  level: number;
  increaseLevel: () => void;
  decreaseLevel: () => void;
};

const DebugContext = createContext<DebugContextType>({
  debug: false,
  toggleDebug: () => {},
  level: 0,
  increaseLevel: () => {},
  decreaseLevel: () => {},
});

export const DebugProvider = ({ children }: { children: React.ReactNode }) => {
  const [debug, setDebug] = useState(false);
  const [level, setLevel] = useState(0);

  const toggleDebug = () => setDebug((prev) => !prev);
  const increaseLevel = () => setLevel((lvl) => lvl + 1);
  const decreaseLevel = () => setLevel((lvl) => Math.max(0, lvl - 1));

  return (
    <DebugContext.Provider
      value={{ debug, toggleDebug, level, increaseLevel, decreaseLevel }}
    >
      {children}
    </DebugContext.Provider>
  );
};

export const useDebug = () => useContext(DebugContext);
