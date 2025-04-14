// app.config.js
import "dotenv/config";
import * as dotenv from "dotenv";
import path from "path";

export default ({ config }) => {
  // Set environment from system variable or fallback to 'development'
  const appEnv = process.env.APP_ENV || "development";

  // Load corresponding .env file
  dotenv.config({ path: path.resolve(__dirname, `.env.${appEnv}`) });

  const isProd = appEnv === "production";
  const isPreview = appEnv === "preview";

  return {
    ...config,
    name: "Wave",
    slug: "Wave",
    scheme: "waveapp",
    owner: "egeneral",
    version: "0.0.1",
    orientation: "portrait",
    primaryColor: "#19295C",

    icon: "./assets/images/icon.png",
    splash: {
      image: "./assets/images/splash.png",
      resizeMode: "cover",
      backgroundColor: "#19295C",
    },

    updates: {
      fallbackToCacheTimeout: 0,
    },

    assetBundlePatterns: ["**/*"],

    ios: {
      supportsTablet: true,
      bundleIdentifier: isProd
        ? "com.pravatustech.waveapp"
        : isPreview
        ? "com.pravatustech.waveapp.preview"
        : "com.pravatustech.waveapp.dev",
      googleServicesFile: isProd
        ? ".plist/GoogleService-Info.prod.plist"
        : isPreview
        ? ".plist/GoogleService-Info.prev.plist"
        : ".plist/GoogleService-Info.dev.plist",
      infoPlist: {
        ITSAppUsesNonExemptEncryption: false,
      },
    },

    android: {
      package: isProd
        ? "com.pravatustech.waveapp"
        : isPreview
        ? "com.pravatustech.waveapp.preview"
        : "com.pravatustech.waveapp.dev",
      googleServicesFile: isProd
        ? ".plist/google-services.prod.json"
        : isPreview
        ? ".plist/google-services.prev.json"
        : ".plist/google-services.dev.json",
      adaptiveIcon: {
        foregroundImage: "./assets/images/adaptive-icon.png",
        backgroundColor: "#F8F9FC",
      },
    },

    platforms: ["ios", "android"],

    web: {
      favicon: "./assets/favicon.png",
    },

    newArchEnabled: false,

    plugins: [
      [
        "expo-build-properties",
        {
          ios: {
            useFrameworks: "static",
          },
        },
      ],
      "expo-router",
      "expo-localization",
      "@react-native-firebase/app",
      "@react-native-firebase/auth",
      "@react-native-firebase/crashlytics",
    ],

    extra: {
      env: appEnv,
      apiBaseUrl: process.env.API_BASE_URL,
      sentryDsn: process.env.SENTRY_DSN,
      discordWebhook: process.env.DISCORD_WEBHOOK_URL,
      eas: {
        projectId: "80b525fe-d626-46aa-81f9-cc24af489c3e",
      },
    },
  };
};
