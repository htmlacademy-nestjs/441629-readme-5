import { Inject, Injectable } from '@nestjs/common';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { rabbitConfig } from '@project/shared/config/users';
import { ConfigType } from '@nestjs/config';
import { CreateSubscriberDto } from './dto/create-subscriber.dto';
import { RabbitRoutingEnum } from '@project/shared/app/types';

@Injectable()
export class NotifyService {
  constructor(
    @Inject(rabbitConfig.KEY)
    private readonly rabbitOptions: ConfigType<typeof rabbitConfig>,

    private readonly rabbitClient: AmqpConnection,
  ) { }

  public async registerSubscriber(dto: CreateSubscriberDto) {
    return this.rabbitClient.publish<CreateSubscriberDto>(
      this.rabbitOptions.exchange,
      RabbitRoutingEnum.AddSubscriber,
      { ...dto },
    );
  }
}
