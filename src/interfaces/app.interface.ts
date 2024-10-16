export interface AppConfig {
  name: string;
  port: number;
  nodeEnv: string;
  reverseProxy: string;
}

export interface DatabaseConfig {
  host: string;
  port: number;
  user: string;
  password: string;
  name: string;
}
