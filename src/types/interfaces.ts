export interface IAppConfig {
  name: string;
  port: number;
  nodeEnv: string;
  reverseProxy: string;
}

export interface IDatabaseConfig {
  user: string;
  password: string;
  name: string;
  url: string;
}

export interface ILogLevels {
  [key: string]: number;
  error: number;
  warn: number;
  info: number;
  http: number;
  debug: number;
}

export interface ILogColors {
  [key: string]: string;
  error: string;
  warn: string;
  info: string;
  http: string;
  debug: string;
}
