import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import appConfig from './config/app.config';
import mongoConfig from './config/mongo.config';
import jwtConfig from './config/jwt.config';
import rabbitConfig from './config/rabbit.config';

const ENV_USERS_FILE_PATH = 'apps/users/users.env';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [appConfig, mongoConfig, jwtConfig, rabbitConfig],
      envFilePath: ENV_USERS_FILE_PATH,
    }),
  ]
})
export class ConfigUsersModule { }
