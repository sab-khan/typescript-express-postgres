export interface IAppConfig {
  name: string;
  port: number;
  nodeEnv: string;
}

export interface IDatabaseConfig {
  user: string;
  password: string;
  name: string;
  url: string;
}
