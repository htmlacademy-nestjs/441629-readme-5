import { ISubscriber } from '@project/shared/app/types';
import { Entity } from '@project/shared/core';

export class EmailSubscriberEntity implements ISubscriber, Entity<string, ISubscriber> {
  public id?: string;
  public email: string;
  public name: string;

  static fromObject(data: ISubscriber): EmailSubscriberEntity {
    return new EmailSubscriberEntity().populate(data);
  }

  public toPOJO() {
    return {
      id: this.id,
      email: this.email,
      name: this.name,
    }
  }

  public populate(data: ISubscriber): EmailSubscriberEntity {
    this.id = data.id ?? undefined;
    this.email = data.email;
    this.name = data.name;

    return this;
  }
}
