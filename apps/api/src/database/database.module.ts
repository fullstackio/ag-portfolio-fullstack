import { Logger, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

const logger = new Logger('DatabaseModule');

@Module({
  imports: [
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const uri = configService.get<string>('app.mongo.uri', { infer: true })!;
        const dbName = configService.get<string>('app.mongo.database', { infer: true });
        const username = process.env.MONGODB_USERNAME;
        const password = process.env.MONGODB_PASSWORD;

        return {
          uri,
          dbName,
          ...(username && password ? { auth: { username, password } } : {}),
          connectionFactory: (connection) => {
            connection.on('connected', () => logger.log('MongoDB connection established'));
            connection.on('error', (error: Error) =>
              logger.error(`MongoDB connection error: ${error.message}`, error.stack),
            );
            connection.on('disconnected', () => logger.warn('MongoDB connection lost'));
            return connection;
          },
        };
      },
    }),
  ],
  exports: [MongooseModule],
})
export class DatabaseModule {}
