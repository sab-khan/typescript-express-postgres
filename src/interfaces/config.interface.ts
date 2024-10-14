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
