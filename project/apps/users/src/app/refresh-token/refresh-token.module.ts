import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RefreshTokenModel, RefreshTokenSchema } from './refresh-token.model';
import { RefreshTokenService } from './refresh-token.service';
import { RefershTokenRepository } from './refresh-token.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: RefreshTokenModel.name,
        schema: RefreshTokenSchema,
      },
    ]),
  ],
  providers: [
    RefreshTokenService,
    RefershTokenRepository,
  ],
  exports: [
    RefreshTokenService,
  ],
})
export class RefreshTokenModule { }
