import { ITokenPayload } from './token-payload.interface';

export interface RefreshTokenPayload extends ITokenPayload {
  tokenId: string;
}
