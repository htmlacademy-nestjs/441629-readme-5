import { SortDirectionEnum } from '@project/shared/app/types';

export const POST = {
  COUNT_LIMIT: 25,
  SEARCH_LIMIT: 20,
  SORT_DIRECTION: SortDirectionEnum.Desc,
  PAGE_COUNT: 1,
}

export const POST_LENGTH_VALUES = {
  TITLE_LENGTH_MIN: 20,
  TITLE_LENGTH_MAX: 50,
  PREVIEW_LENGTH_MIN: 50,
  PREVIEW_LENGTH_MAX: 255,
  TEXT_LENGTH_MIN: 100,
  TEXT_LENGTH_MAX: 1024,
  DESCRIPTION_LINK_MAX: 300,
}

export const POST_ERROR_MESSAGES = {
  TITLE_FORMAT: 'Post title field must be a string',
  TITLE_LENGTH: 'Post title field must be from 20 to 50 symbols',
  LINK_FORMAT: 'Post link field must be a valid url',
  PREVIEW_FORMAT: 'Post preview field must be a string',
  PREVIEW_LENGTH: 'Post preview field must be from 50 to 255 symbols',
  TEXT_FORMAT: 'Post text field must be a string',
  TEXT_LENGTH_TEXT: 'Post text field must be from 100 to 1024 symbols',
  TEXT_LENGTH_QUOTE: 'Post text field must be from 20 to 300 symbols',
  AUTHOR_FORMAT: 'Post author field must be a string',
  AUTHOR_LENGTH: 'Post author field must be from 3 to 50 symbols',
  PHOTO_FORMAT: 'Post photo field must be a file less then 1MB and PNG or JPG',
  DESCRIPTION_FORMAT: 'Post description field must be a string',
  DESCRIPTION_LENGTH: 'Post description field must be less then 300 symbols',
}

export const POST_FIELD_INFO = {
  POST_TYPE_DESCRIPTION: 'Post type one of: video, text, quote, photo, link.',
  POST_TYPE_EXAMPLE: 'quote',
  POST_TITLE_DESCRIPTION: 'Title of some post with length from 20 to 50',
  POST_TITLE_EXAMPLE: 'Some post title',
  POST_LINK_DESCRIPTION: 'Some url',
  POST_LINK_EXAMPLE: 'https://url.domain/source.html',
  POST_PREVIEW_DESCRIPTION: 'Short text as preview of full info',
  POST_PREVIEW_EXAMPLE: 'Little text',
  POST_TEXT_DESCRIPTION: 'Full text of post',
  POST_TEXT_EXAMPLE: 'Full post text with some infomation',
  POST_AUTHOR_DESCRIPTION: 'Author of some data for post',
  POST_AUTHOR_EXAMPLE: 'Alexandr Pushkin',
  POST_PHOTO_DESCRIPTION: 'Some photo for photo post',
  POST_PHOTO_EXAMPLE: '/usr/local/item.png',
  POST_DESCRIPTION_DESCRIPTION: 'Description about post',
  POST_DESCRIPTION_EXAMPLE: 'Alexandr Pushkin',
  POST_TAGS_DESCRIPTION: 'IDs of tags',
  POST_TAGS_EXAMPLE: 'aaa-aaa-aaa',
}
