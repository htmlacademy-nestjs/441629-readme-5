import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthenticationService } from '../authentication.service';
import { IUser } from '@project/shared/app/types';

const USERNAME_FIELD_NAME = 'email';

@Injectable()
export class LocalAccessStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthenticationService
  ) {
    super({ usernameField: USERNAME_FIELD_NAME });
  }

  public async validate(email: string, password: string): Promise<IUser> {
    return this.authService.verifyUser({ email, password });
  }
}
