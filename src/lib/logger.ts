/**
 * logger.ts - 结构化日志服务
 * 替代 console 语句，支持日志级别和格式化输出
 */

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LoggerConfig {
  /** 是否启用日志（生产环境可设为 false） */
  enabled: boolean;
  /** 最低日志级别 */
  minLevel: LogLevel;
  /** 是否包含时间戳 */
  timestamp: boolean;
  /** 日志前缀 */
  prefix: string;
}

const LOG_LEVEL_PRIORITY: Record<LogLevel, number> = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
};

const DEFAULT_CONFIG: LoggerConfig = {
  enabled: process.env.NODE_ENV !== 'test',
  minLevel: process.env.NODE_ENV === 'production' ? 'warn' : 'debug',
  timestamp: true,
  prefix: '[Veloform]',
};

class Logger {
  private config: LoggerConfig;

  constructor(config: Partial<LoggerConfig> = {}) {
    this.config = { ...DEFAULT_CONFIG, ...config };
  }

  private shouldLog(level: LogLevel): boolean {
    if (!this.config.enabled) return false;
    return LOG_LEVEL_PRIORITY[level] >= LOG_LEVEL_PRIORITY[this.config.minLevel];
  }

  private formatMessage(level: LogLevel, ...args: unknown[]): unknown[] {
    const parts: unknown[] = [];

    if (this.config.timestamp) {
      parts.push(new Date().toISOString());
    }

    parts.push(`${this.config.prefix}[${level.toUpperCase()}]`);
    parts.push(...args);

    return parts;
  }

  debug(...args: unknown[]): void {
    if (this.shouldLog('debug')) {
      console.debug(...this.formatMessage('debug', ...args));
    }
  }

  info(...args: unknown[]): void {
    if (this.shouldLog('info')) {
      console.info(...this.formatMessage('info', ...args));
    }
  }

  warn(...args: unknown[]): void {
    if (this.shouldLog('warn')) {
      console.warn(...this.formatMessage('warn', ...args));
    }
  }

  error(...args: unknown[]): void {
    if (this.shouldLog('error')) {
      console.error(...this.formatMessage('error', ...args));
    }
  }

  /** 创建子日志器，带有特定前缀 */
  child(prefix: string): Logger {
    return new Logger({
      ...this.config,
      prefix: `${this.config.prefix}${prefix}`,
    });
  }

  /** 更新配置 */
  updateConfig(config: Partial<LoggerConfig>): void {
    this.config = { ...this.config, ...config };
  }
}

// 导出默认日志器实例
export const logger = new Logger();

// 导出特定模块的日志器
export const authLogger = logger.child('[Auth]');
export const supabaseLogger = logger.child('[Supabase]');
export const configLogger = logger.child('[Config]');
export const uiLogger = logger.child('[UI]');

// 导出 Logger 类用于自定义实例
export { Logger };
export type { LoggerConfig, LogLevel };
