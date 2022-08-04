declare global {
  type LoggerTag = 'global' | 'network';

  type LoggerLevel = 'log' | 'warn' | 'error' | 'off';

  type LoggerConfig = Record<
    LoggerTag,
    {
      level: LoggerLevel;
    }
  >;

  interface ILogger {
    log: typeof console.log;
    warn: typeof console.warn;
    error: typeof console.error;
    setLevel: (level: LoggerLevel) => void;
    getLeveL: () => LoggerLevel;
    canLog: (level: LoggerLevel) => boolean;
  }

  // place additional loggers here to access globally via TS
  type ConsoleLoggers = {
    globalLogger: ILogger;
    networkLogger: ILogger;
  };

  // extend console interface
  interface Console extends ConsoleLoggers {
    /**
     * alias the RN Alert.alert module for DEV only.
     * useful for debugging. no-ops in stage/prod.
     */
    alert: (title: string, msg?: string) => void;
  }
}

export {};
