import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class CheckNewUserGuard implements CanActivate {
  constructor(
    private readonly httpService: HttpService,
  ) { }

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    return !request.headers['authorization'];
  }
}
