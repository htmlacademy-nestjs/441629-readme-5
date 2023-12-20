import { registerAs } from '@nestjs/config';
import { plainToInstance } from 'class-transformer';
import { AppEnvironment } from '../app.env';
import { validateSync } from 'class-validator';

const DEFAULT_PORT = 3000;

export interface ApplicationConfig {
  environment: string;
  port: number;
}

export default registerAs('application', (): ApplicationConfig => {
  const config: ApplicationConfig = {
    environment: process.env.NODE_ENV,
    port: parseInt(process.env.PORT || DEFAULT_PORT.toString(), 10),
  };

  const appEnvironment = plainToInstance(
    AppEnvironment,
    config,
    {
      enableImplicitConversion: true,
    },
  )

  const errors = validateSync(
    appEnvironment,
    {
      skipMissingProperties: false,
    }
  )

  if (errors.length) {
    throw new Error(errors.toString());
  }

  return config;
})
