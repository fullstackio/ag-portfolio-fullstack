export interface AppConfig {
  env: string;
  port: number;
  apiPrefix: string;
  corsOrigins: string[];
  mongo: {
    uri: string;
    database: string;
  };
  throttle: {
    ttl: number;
    limit: number;
  };
}

export default (): { app: AppConfig } => ({
  app: {
    env: process.env.NODE_ENV ?? 'development',
    port: Number(process.env.PORT ?? 4000),
    apiPrefix: process.env.API_PREFIX ?? 'api/v1',
    corsOrigins: (process.env.CORS_ORIGINS ?? 'http://localhost:3000,http://localhost:3001')
      .split(',')
      .map((origin) => origin.trim())
      .filter(Boolean),
    mongo: {
      uri: process.env.MONGODB_URI ?? 'mongodb://localhost:27017',
      database: process.env.MONGODB_DATABASE ?? 'ag_portfolio',
    },
    throttle: {
      ttl: Number(process.env.THROTTLE_TTL ?? 60_000),
      limit: Number(process.env.THROTTLE_LIMIT ?? 100),
    },
  },
});
