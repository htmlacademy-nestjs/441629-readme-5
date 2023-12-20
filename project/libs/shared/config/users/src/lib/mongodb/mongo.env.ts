import { IsNumber, IsString, Max, Min } from 'class-validator';
import { EnvValidationMessage } from './mongo.messages';
import { MONGO_PORT } from './mongo.const';

export class MongoEnvironment {
  @IsString({
    message: EnvValidationMessage.NameRequired,
  })
  public name: string;

  @IsString({
    message: EnvValidationMessage.HostRequired,
  })
  public host: string;

  @IsNumber({}, {
    message: EnvValidationMessage.PortRequited,
  })
  @Min(MONGO_PORT.MIN)
  @Max(MONGO_PORT.MAX)
  public port: number;

  @IsString({
    message: EnvValidationMessage.UserRequired
  })
  public user: string;

  @IsString({
    message: EnvValidationMessage.PasswordRequired
  })
  public password: string;

  @IsString({
    message: EnvValidationMessage.BaseAuthRequired
  })
  public authBase: string;
}
