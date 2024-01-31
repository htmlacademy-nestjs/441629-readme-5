export const COMMENT = {
  COUNT_PER_PAGE: 50,
  PAGE_NUMBER: 1,
  LENGTH_MIN: 10,
  LENGHT_MAX: 300,
}

export const COMMENT_VALIDATE = {
  MESSAGE: 'Comment for post from authorized user',
  MESSAGE_EXAMPLE: 'This is cool',
  MESSAGE_LENGTH: `Comment must be string from ${COMMENT.LENGTH_MIN} to ${COMMENT.LENGHT_MAX} symbols`,
  USER_ID: 'Some mongo id',
  USER_ID_EXAMPLE: '658170cbb954e9f5b905ccf4',
}

export const API = {
  SHOW: 'Show comments for post by id',
  CREATE: 'Create a new comment for post',
  DELETE: 'Delete comment by ID',
}
