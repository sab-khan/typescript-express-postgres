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
