import { IsEnum, IsNumber, Max, Min } from 'class-validator';

export enum EnvValidationMessage {
  appEnvEnum = 'Environment is must be \'development\', \'production\' or \'stage\'',
  AppPortRequired = 'DB port is required',
}

export enum AppEnvEnum {
  DEV = 'development',
  PROD = 'production',
  STAGE = 'stage',
}

const MIN_PORT = 0;
const MAX_PORT = 65535;

export class AppEnvironment {
  @IsEnum(AppEnvEnum, {
    message: EnvValidationMessage.appEnvEnum,
  })
  public environment: string;

  @IsNumber({}, {
    message: EnvValidationMessage.AppPortRequired,
  })
  @Min(MIN_PORT)
  @Max(MAX_PORT)
  public port: number;
}
