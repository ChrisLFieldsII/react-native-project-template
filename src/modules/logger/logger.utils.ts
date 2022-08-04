// TODO: move to Debug module

import { logger as RNLogger, transportFunctionType } from 'react-native-logs';
import { Alert } from 'react-native';
import { loggerConfig as defaultConfig } from './defaultLogger.config';

let loggerConfig: LoggerConfig = defaultConfig;

// logger.config only available in dev to allow devs to customize logs seen
if (__DEV__) {
  try {
    const loggerConfigPkg = require('./logger.config');
    loggerConfig = loggerConfigPkg.loggerConfig;
    console.log('Logger: using logger config', loggerConfig);
  } catch (error) {
    console.warn(
      'Logger: it seems you do not have a `logger.config.ts` file. Using defaults',
    );
  }
}

const loggerLevelMap: Record<LoggerLevel, number> = {
  log: 1,
  warn: 2,
  error: 3,
  off: 99,
};

// we keep references to default console logging methods as they are overridden
const _log = console.log;
const _warn = console.warn;
const _error = console.error;

/**
 * This is a simple logger that only allows customizing logger level
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
class BasicLogger implements ILogger {
  private prefix: string;

  constructor(private tag: LoggerTag, private level: LoggerLevel = 'log') {
    _log(`Logger: Setting log level to ${level} for ${tag}`);

    this.prefix = `${this.tag}: `;
  }

  log = (msg?: any, ...optionalParams: any[]) => {
    if (this.canLog('log')) {
      _log(this.prefix, msg, ...optionalParams);
    }
  };

  warn = (msg?: any, ...optionalParams: any[]) => {
    if (this.canLog('warn')) {
      _warn(this.prefix, msg, ...optionalParams);
    }
  };

  error = (msg?: any, ...optionalParams: any[]) => {
    if (this.canLog('error')) {
      _error(this.prefix, msg, ...optionalParams);
    }
  };

  setLevel = (level: LoggerLevel) => {
    this.level = level;
  };

  getLeveL = () => this.level;

  canLog = (level: LoggerLevel) => {
    if (!__DEV__) {
      return false;
    }

    const currLevel = loggerLevelMap[this.level];
    const inputLevel = loggerLevelMap[level];

    if (currLevel > inputLevel) {
      return false;
    }

    return true;
  };
}

const colors = {
  default: null,
  black: 30,
  red: 31,
  green: 32,
  yellow: 33,
  blue: 34,
  magenta: 35,
  cyan: 36,
  white: 37,
  grey: 90,
  redBright: 91,
  greenBright: 92,
  yellowBright: 93,
  blueBright: 94,
  magentaBright: 95,
  cyanBright: 96,
  whiteBright: 97,
};
const resetColors = '\x1b[0m';

/**
 * This logger composes `react-native-logs` and allows advanced functionality
 * like different transports, color options, logging prefixes.
 */
class AdvancedLogger implements ILogger {
  private logger;
  private parentLogger;

  private colors: Record<string, any> = colors;
  private resetColors = resetColors;

  constructor(private tag: LoggerTag, private level: LoggerLevel = 'log') {
    _log(`Logger: Setting log level to ${level} for ${tag}`);

    // https://github.com/onubo/react-native-logs#configuration
    this.parentLogger = RNLogger.createLogger({
      levels: loggerLevelMap,
      severity: loggerConfig[tag].level,
      transport: this.consoleTransport,
      printLevel: false,
      printDate: false,
      // transportOptions: {
      //   extensionColors: {
      //     airship: 'blueBright',
      //     firebase: 'redBright',
      //     global: 'blue',
      //     newRelic: 'green',
      //     quantumMetric: 'magenta',
      //     screen: 'red',
      //   } as Record<LoggerTag, keyof typeof colors>,
      // },
    });

    // have to extend for namespace.
    this.logger = this.parentLogger.extend(tag);
  }

  log = (msg?: any, ...optionalParams: any[]) => {
    this.logger.log(msg, ...optionalParams);
  };

  warn = (msg?: any, ...optionalParams: any[]) => {
    this.logger.warn(msg, ...optionalParams);
  };

  error = (msg?: any, ...optionalParams: any[]) => {
    this.logger.error(msg, ...optionalParams);
  };

  setLevel = (level: LoggerLevel) => {
    _log(`Setting logger ${this.tag} level to ${level}`);
    this.parentLogger.setSeverity(level);
  };

  getLeveL = () => {
    return this.parentLogger.getSeverity() as LoggerLevel;
  };

  canLog = (level: LoggerLevel) => {
    const currLevel = loggerLevelMap[this.level];
    const inputLevel = loggerLevelMap[level];

    if (currLevel > inputLevel) {
      return false;
    }

    return true;
  };

  // code pulled from here: https://github.com/onubo/react-native-logs/blob/master/src/transports/consoleTransport.ts
  // had to rip custom transport and use `_log` since we override `console.log` and this lib called `console.log` creating infinite cycle
  consoleTransport: transportFunctionType = (props) => {
    if (!props) return false;

    const loggerLevel = props.level.text as Exclude<LoggerLevel, 'off'>;

    let msg = props.msg;
    let color;

    if (
      props.options?.colors &&
      props.options.colors[props.level.text] &&
      this.colors[props.options.colors[props.level.text]]
    ) {
      color = `\x1b[${this.colors[props.options.colors[props.level.text]]}m`;
      msg = `${color}${msg}${this.resetColors}`;
    }

    if (props.extension && props.options?.extensionColors) {
      let extensionColor = '\x1b[7m';

      if (
        props.options.extensionColors[props.extension] &&
        this.colors[props.options.extensionColors[props.extension]]
      ) {
        extensionColor = `\x1b[${
          this.colors[props.options.extensionColors[props.extension]] + 10
        }m`;
      }

      let extStart = color ? this.resetColors + extensionColor : extensionColor;
      let extEnd = color ? this.resetColors + color : this.resetColors;
      msg = msg.replace(
        props.extension,
        `${extStart} ${props.extension} ${extEnd}`,
      );
    }

    const loggerMap: Record<
      Exclude<LoggerLevel, 'off'>,
      typeof _log | typeof _warn | typeof _error
    > = {
      log: _log,
      warn: _warn,
      error: _error,
    };

    loggerMap[loggerLevel](msg.trim());

    return true;
  };
}

export const tags = Object.keys(loggerConfig) as LoggerTag[];
export const levels = Object.keys(loggerLevelMap) as LoggerLevel[];
export { loggerConfig };

/** a map of our app loggers. each logger is customizable via `logger.config.ts` */
const loggers = tags.reduce((accum, tag) => {
  return {
    ...accum,
    [`${tag}Logger`]: new AdvancedLogger(tag, loggerConfig[tag].level),
  };
}, {} as Record<`${LoggerTag}Logger`, ILogger>);

// attach loggers to console
tags.forEach((tag) => {
  // @ts-ignore
  console[`${tag}Logger`] = loggers[`${tag}Logger`];
});

const logger: ILogger = loggers.globalLogger;

// override common console logging operations to use globalLogger
console.log = logger.log;
console.warn = logger.warn;
console.error = logger.error;

console.alert = (title: string, msg?: string) => {
  if (__DEV__) {
    Alert.alert(title, msg);
  }
};
