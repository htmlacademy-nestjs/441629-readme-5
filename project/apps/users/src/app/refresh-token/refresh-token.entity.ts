import { IToken } from '@project/shared/app/types';
import { Entity } from '@project/shared/core';

export class RefreshTokenEntity implements Entity<string>, IToken {
  public id: string;
  public tokenId: string;
  public userId: string;
  public createdAt: Date;
  public expiresIn: Date;
  [key: string]: unknown;

  constructor(data: IToken) {
    this.populate(data);
  }

  static fromObject(data: IToken): RefreshTokenEntity {
    return new RefreshTokenEntity(data);
  }

  public toPOJO() {
    return {
      id: this.id,
      tokenId: this.tokenId,
      userId: this.userId,
      createdAt: this.createdAt,
      expiresIn: this.expiresIn,
    }
  }

  public populate(data: IToken) {
    this.id = data.id ?? undefined;
    this.tokenId = data.tokenId;
    this.userId = data.userId;
    this.createdAt = data.createdAt;
    this.expiresIn = data.expiresIn;
  }
}
