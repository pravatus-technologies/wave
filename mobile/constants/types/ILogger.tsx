export type LogLevel = "debug" | "info" | "warn" | "error";

export interface ILogger {
  debug: (ctx: string | undefined, msg: string) => void;
  info: (ctx: string | undefined, msg: string) => void;
  warn: (err: unknown, ctx: string | undefined, msg: string) => void;
  error: (err: unknown, ctx: string | undefined, msg: string) => void;
}
