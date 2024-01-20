import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NotifyConfigModule, getMongooseOptions } from '@project/shared/config/notify';
import { EmailSubscriberModule } from './email-subscriber/email-subscriber.module';

@Module({
  imports: [
    MongooseModule.forRootAsync(getMongooseOptions()),
    NotifyConfigModule,
    EmailSubscriberModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
