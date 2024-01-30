import { Injectable } from '@nestjs/common';
import { EmailSubscriberRepository } from './email-subscriber.repository';
import { CreateSubscriberDto } from './dto/create-subscriber.dto';
import { EmailSubscriberEntity } from './email-subscriber.entity';

@Injectable()
export class EmailSubscriberService {
  constructor(
    private readonly emailSubscriberRepository: EmailSubscriberRepository,
  ) { }

  public async addSubscriber(subscriber: CreateSubscriberDto): Promise<EmailSubscriberEntity> {
    const { email } = subscriber;
    const existsSubscriber = await this.emailSubscriberRepository.findByEmail(email);

    if (existsSubscriber) {
      return existsSubscriber;
    }

    return this.emailSubscriberRepository.save(new EmailSubscriberEntity().populate(subscriber));
  }

  public async getSubscribersEmails() {
    const subscribers = await this.emailSubscriberRepository.findAll();

    return subscribers.map(item => item.email);
  }
}
