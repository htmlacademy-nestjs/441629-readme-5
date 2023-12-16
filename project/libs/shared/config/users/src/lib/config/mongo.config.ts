import { registerAs } from '@nestjs/config';
import { plainToInstance } from 'class-transformer';
import { MongoEnvironment } from '../mongodb/mongo.env';
import { validateSync } from 'class-validator';
import { MONGO_PORT } from '../mongodb/mongo.const';

export interface MongoConfig {
  host: string;
  name: string;
  port: number;
  user: string;
  password: string;
  authBase: string;
}

export default registerAs('db', (): MongoConfig => {
  const config: MongoConfig = {
    host: process.env.MONGO_HOST,
    port: parseInt(process.env.MONGO_PORT ?? MONGO_PORT.DEFAULT.toString(), 10),
    name: process.env.MONGO_DB,
    user: process.env.MONGO_USER,
    password: process.env.MONGO_PASSWORD,
    authBase: process.env.MONGO_AUTH_BASE,
  };

  const mongoEnvironment = plainToInstance(
    MongoEnvironment,
    config,
    {
      enableImplicitConversion: true,
    },
  );

  const errors = validateSync(
    mongoEnvironment,
    {
      skipMissingProperties: false,
    }
  )

  if (errors.length) {
    throw new Error(errors.toString());
  }

  return config;
});
