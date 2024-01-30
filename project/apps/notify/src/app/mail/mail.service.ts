import { Inject, Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { NotifyConfig } from '@project/shared/config/notify';
import { ConfigType } from '@nestjs/config';
import { ISubscriber } from '@project/shared/app/types';
import { EMAIL_SUBJECT } from './mail.constant';

@Injectable()
export class MailService {
  constructor(
    private readonly mailService: MailerService,
  ) { }

  @Inject(NotifyConfig.KEY)
  private readonly notifyConfig: ConfigType<typeof NotifyConfig>

  public async sendNotifyNewSubscriber(subscriber: ISubscriber) {
    await this.mailService.sendMail({
      from: this.notifyConfig.mail.from,
      to: subscriber.email,
      subject: EMAIL_SUBJECT.ADD_SUBSCRIBER,
      template: './add-subscriber',
      context: {
        user: `${subscriber.name}`,
        email: `${subscriber.email}`,
      },
    });
  }
}
