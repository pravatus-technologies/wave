declare module '@env' {
  export const APP_ENV: 'development' | 'preview' | 'production';
  export const SENTRY_DSN: string;
  export const DISCORD_WEBHOOK_URL: string;
  export const SUPPORTED_LOCALES: string;
  export const BYPASS_API_ENDPOINT: boolean;
}