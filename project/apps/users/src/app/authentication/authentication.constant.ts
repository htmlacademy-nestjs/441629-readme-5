export const VALIDATION_USER = {
  MIN_PASS_LENGTH: 6,
  MAX_PASS_LENGTH: 12,
}

export const AUTH = {
  USER_EXISTS: 'User with this email exists',
  USER_NOT_FOUND: 'User not found',
  USER_PASSWORD_WRONG: 'User password is wrong',
  USER_EMAIL_NOT_VALID: 'The email is not valid',
  USER_PASSWORD_OR_EMAIL_WRONG: 'Password or login wrong',
  USER_PASSWORD_LENGTH_WRONG: `Password must be >= ${VALIDATION_USER.MIN_PASS_LENGTH} and <= ${VALIDATION_USER.MAX_PASS_LENGTH}`,
  CREATED: 'The new user has been successfully created',
  GET: 'User found',
  LOGGED: 'User has been successfully logged',
  TOKEN: 'Update an access/refresh tokens',
  CHECK_TOKEN: 'Check jwt token',
  UNAUTHORIZED: 'User is not authorized',
}

export const API = {
  PASSWORD: 'User password',
  PASSWORD_EXAMPLE: '123456',
  USER_ID: 'Mongo ID as user ID',
  USER_ID_EXAMPLE: '6580462f5e238357ab17003a',
  EMAIL: 'User unique email address',
  EMAIL_EXAMPLE: 'example@email.local',
  NAME: 'User name and lastname',
  NAME_EXAMPLE: 'Alexandr Pushkin',
  AVATAR: 'User avatar path',
  AVATAR_EXAMPLE: '/usr/source/image.png',
  TOKEN: 'Token for access to service',
  TOKEN_EXAMPLE: 'json.web.token',
}
