import mongoose from 'mongoose';

import { getEnv } from './env';

/**
 * Next.js dev mode and serverless invocations can create many module instances; caching the
 * connection promise on `globalThis` avoids exhausting MongoDB connections across hot reloads
 * (the standard Next.js + Mongoose pattern).
 */
const globalForMongoose = globalThis as unknown as {
  mongooseConnectionPromise?: Promise<typeof mongoose>;
};

export function getDb(): Promise<typeof mongoose> {
  if (!globalForMongoose.mongooseConnectionPromise) {
    const env = getEnv();
    const { MONGODB_URI, MONGODB_DATABASE, MONGODB_USERNAME, MONGODB_PASSWORD } = env;

    globalForMongoose.mongooseConnectionPromise = mongoose
      .connect(MONGODB_URI, {
        dbName: MONGODB_DATABASE,
        ...(MONGODB_USERNAME && MONGODB_PASSWORD
          ? { auth: { username: MONGODB_USERNAME, password: MONGODB_PASSWORD } }
          : {}),
      })
      .then((connection) => {
        connection.connection.on('error', (error: Error) => {
          console.error('MongoDB connection error:', error);
        });
        connection.connection.on('disconnected', () => {
          console.warn('MongoDB connection lost');
        });
        return connection;
      });
  }

  return globalForMongoose.mongooseConnectionPromise;
}
