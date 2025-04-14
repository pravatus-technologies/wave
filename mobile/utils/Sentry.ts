import * as Sentry from "@sentry/react-native";

import { SENTRY_DSN, APP_ENV } from '@env';

if ((APP_ENV === 'production') || (APP_ENV === 'preview') && SENTRY_DSN) {
  Sentry.init({
    dsn: SENTRY_DSN,
    // Adds more context data to events (IP address, cookies, user, etc.)
    // For more information, visit: https://docs.sentry.io/platforms/react-native/data-management/data-collected/
    sendDefaultPii: true,
    // Set tracesSampleRate to 1.0 to capture 100% of transactions for tracing.
    // We recommend adjusting this value in production.
    tracesSampleRate: 1.0,
    // profilesSampleRate is relative to tracesSampleRate.
    // Here, we'll capture profiles for 100% of transactions.
    profilesSampleRate: 1.0,
    debug: __DEV__
  });
}