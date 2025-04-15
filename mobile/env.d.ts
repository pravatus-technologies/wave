declare module '@env' {
  export const APP_ENV: 'development' | 'preview' | 'production';
  export const SENTRY_DSN: string;
  export const DISCORD_WEBHOOK_URL: string;
  export const SUPPORTED_LOCALES: string;
  export const BYPASS_API_ENDPOINT: boolean;
}

declare module '*.ttf' {
  const content: import('expo-font').FontSource;
  export default content;
}

declare module '*.png' {
  const content: import('react-native').ImageSourcePropType;
  export default content;
}

declare module '*.jpg' {
  const content: import('react-native').ImageSourcePropType;
  export default content;
}

declare module '*.jpeg' {
  const content: import('react-native').ImageSourcePropType;
  export default content;
}
