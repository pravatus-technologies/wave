import React, { createContext, useContext, useMemo } from "react";
import { Platform } from "react-native";

import * as Sentry from "@sentry/react-native";
import crashlytics from "@react-native-firebase/crashlytics";

import { APP_ENV } from "@env";
import { Logger } from "@/utils/Logger";

const isDev = APP_ENV === "development";

type AppEnvironment = {
  isDev: boolean;
  platform: "ios" | "android" | "windows" | "macos" | "web";
  logger: typeof Logger;
  telemetry: typeof Sentry | typeof crashlytics;
};

const EnvironmentContext = createContext<AppEnvironment | undefined>(undefined);

export const EnvironmentProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const env = useMemo<AppEnvironment>(
    () => ({
      isDev,
      platform: Platform.OS,
      logger: Logger,
      telemetry: Platform.OS === "ios" ? Sentry : crashlytics,
    }),
    []
  );

  return (
    <EnvironmentContext.Provider value={env}>
      {children}
    </EnvironmentContext.Provider>
  );
};

export const useAppEnv = () => {
  const context = useContext(EnvironmentContext);
  if (!context)
    throw new Error("useAppEnv must be used within EnvironmentProvider");
  return context;
};
