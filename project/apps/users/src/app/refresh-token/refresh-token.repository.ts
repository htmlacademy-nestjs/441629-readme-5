import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BaseMongoRepository } from '@project/shared/core';
import { RefreshTokenEntity } from './refresh-token.entity';
import { RefreshTokenModel } from './refresh-token.model';
import { IToken } from '@project/shared/app/types';

@Injectable()
export class RefershTokenRepository extends BaseMongoRepository<RefreshTokenEntity, RefreshTokenModel> {
  constructor(
    @InjectModel(RefreshTokenModel.name)
    private readonly refreshTokenModel: Model<RefreshTokenModel>,
  ) {
    super(refreshTokenModel, RefreshTokenEntity.fromObject);
  }

  public async create(item: RefreshTokenEntity): Promise<IToken> {
    return new this.refreshTokenModel(item).save();
  }

  public async deleteByTokenId(tokenId: string) {
    return this.refreshTokenModel
      .deleteOne({ tokenId })
      .exec();
  }

  public async findByTokenId(tokenId: string): Promise<IToken | null> {
    return this.refreshTokenModel
      .findOne({ tokenId })
      .exec();
  }

  public async deleteExpiredTokens() {
    return this.refreshTokenModel
      .deleteMany({ expiresIn: { $lt: new Date() } });
  }
}
