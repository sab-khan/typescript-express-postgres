export interface AppConfig {
  name: string;
  port: number;
  nodeEnv: string;
  reverseProxy: string;
}

export interface DatabaseConfig {
  user: string;
  password: string;
  name: string;
  url: string;
}

export interface LogLevels {
  [key: string]: number;
  error: number;
  warn: number;
  info: number;
  http: number;
  debug: number;
}

export interface LogColors {
  [key: string]: string;
  error: string;
  warn: string;
  info: string;
  http: string;
  debug: string;
}
