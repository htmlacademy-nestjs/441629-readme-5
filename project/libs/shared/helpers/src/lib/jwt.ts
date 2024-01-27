import { ITokenPayload, IUser } from '@project/shared/app/types';

export function createJWTPayload(user: IUser): ITokenPayload {
  return {
    sub: user.id,
    email: user.email,
    name: user.name,
  };
}
