export interface IAppConfig {
  name: string;
  port: number | undefined;
  nodeEnv: 'development' | 'production' | 'test' | undefined;
}

export interface IDatabaseConfig {
  user: string;
  password: string;
  name: string;
  url: string;
}
