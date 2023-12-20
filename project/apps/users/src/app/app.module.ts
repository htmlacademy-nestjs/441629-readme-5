import { Module } from '@nestjs/common';
import { ConfigUsersModule, getMongooseOptions } from '@project/shared/config/users';
import { BlogUserModule } from './blog-user/blog-user.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    AuthenticationModule,
    BlogUserModule,
    ConfigUsersModule,
    MongooseModule.forRootAsync(
      getMongooseOptions(),
    )
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
