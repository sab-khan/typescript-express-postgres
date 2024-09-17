// Purpose: Define the environment variables for the application.
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      APP_NAME: string;
      APP_PORT: number;
      NODE_ENV: 'development' | 'production' | 'test';
      REVERSE_PROXY: string;
      DB_USER: string;
      DB_PASSWORD: string;
      DB_NAME: string;
      DB_URL: string;
    }
  }
}

export {};
