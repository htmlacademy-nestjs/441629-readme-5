import { ITag } from '@project/shared/app/types';
import { Entity } from '@project/shared/core';

export class BlogTagEntity implements ITag, Entity<string, ITag> {
  public id: string;
  public title: string;

  constructor(data: ITag) {
    if (!data.title) {
      throw new Error('Tag title is required');
    }

    this.populate(data);
  }

  public populate(data: ITag): void {
    this.id = data.id ?? undefined;
    this.title = data.title;
  }

  public toPOJO(): ITag {
    return {
      id: this.id,
      title: this.title,
    };
  }

  static fromObject(data: ITag): BlogTagEntity {
    return new BlogTagEntity(data);
  }
}
