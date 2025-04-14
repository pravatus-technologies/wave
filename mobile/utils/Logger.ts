import crashlytics from '@react-native-firebase/crashlytics';
import * as Sentry from '@sentry/react-native';
import {
  APP_ENV,
  SENTRY_DSN,
  DISCORD_WEBHOOK_URL
} from '@env';
import { ILogger } from '@/constants/types';

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

const CURRENT_ENV = APP_ENV || 'development';

const isDev = CURRENT_ENV === 'development';
const isProd = CURRENT_ENV === 'production';
const isPreview = CURRENT_ENV === 'preview';

const levelOrder = ['debug', 'info', 'warn', 'error'];

const minLevelForEnv: Record<string, LogLevel> = {
  development: 'debug',
  staging: 'info',
  production: 'warn'
};

const isLogLevelEnabled = (level: LogLevel): boolean => {
  const currentMinLevel = minLevelForEnv[CURRENT_ENV] || 'debug';
  return levelOrder.indexOf(level) >= levelOrder.indexOf(currentMinLevel);
};

export const log = async (
  level: LogLevel,
  message: string,
  context?: string,
  error?: unknown
) => {
  if (!isLogLevelEnabled(level)) return;

  const tag = context ? `[${context}]` : '';
  const prefix = `[${level.toUpperCase()}]`;
  const fullMessage = `${prefix} ${tag} ${message}`;
  const err = error instanceof Error ? error : new Error(String(error ?? 'Unknown error'));

  if (isDev) {
    if (level === 'error' || level === 'warn') {
      console.error(fullMessage, err ?? '');
    } else {
      console.log(fullMessage);
    }
  }

  if (['warn', 'error'].includes(level)) {
    if (isProd && err) {
      crashlytics().recordError(err);
    }

    if ((isProd || isPreview) && err && SENTRY_DSN) {
      Sentry.captureException(err);
    }

    if (DISCORD_WEBHOOK_URL) {
      await fetch(DISCORD_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: fullMessage })
      });
    }
  }
};

// Updated helper function signatures
export const logDebug = (ctx: string | undefined, msg: string) => log('debug', msg, ctx);
export const logInfo = (ctx: string | undefined, msg: string) => log('info', msg, ctx);
export const logWarn = (err: unknown, ctx: string | undefined, msg: string) => log('warn', msg, `${ctx ?? "NOCTX"}`, err);
export const logError = (err: unknown, ctx: string | undefined, msg: string) => log('error', msg, `${ctx ?? "NOCTX"}`, err);

export const Logger: ILogger = {
  debug: logDebug,
  info: logInfo,
  warn: logWarn,
  error: logError
};

export default Logger;
