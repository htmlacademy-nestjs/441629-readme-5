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
  QUOTE_LENGTH_MIN: 20,
  QUOTE_LENGTH_MAX: 300,
  DESCRIPTION_LINK_MAX: 300,
  AUTHOR_LENGTH_MIN: 3,
  AUTHOR_LENGTH_MAX: 50,
}

export const POST_ERROR_MESSAGES = {
  TITLE_FORMAT: 'Post title field must be a string',
  TITLE_LENGTH: `Post title field must be from ${POST_LENGTH_VALUES.TITLE_LENGTH_MIN} to ${POST_LENGTH_VALUES.TITLE_LENGTH_MAX} symbols`,
  LINK_FORMAT: 'Post link field must be a valid url',
  PREVIEW_FORMAT: 'Post preview field must be a string',
  PREVIEW_LENGTH: `Post preview field must be from ${POST_LENGTH_VALUES.PREVIEW_LENGTH_MIN} to ${POST_LENGTH_VALUES.PREVIEW_LENGTH_MAX} symbols`,
  TEXT_FORMAT: 'Post text field must be a string',
  TEXT_LENGTH_TEXT: `Post text field must be from ${POST_LENGTH_VALUES.TEXT_LENGTH_MIN} to ${POST_LENGTH_VALUES.TEXT_LENGTH_MAX} symbols`,
  TEXT_LENGTH_QUOTE: `Post text field must be from ${POST_LENGTH_VALUES.TEXT_LENGTH_MIN} to ${POST_LENGTH_VALUES.TEXT_LENGTH_MAX} symbols`,
  AUTHOR_FORMAT: 'Post author field must be a string',
  AUTHOR_LENGTH: `Post author field must be from ${POST_LENGTH_VALUES.AUTHOR_LENGTH_MIN} to ${POST_LENGTH_VALUES.AUTHOR_LENGTH_MAX} symbols`,
  PHOTO_FORMAT: 'Post photo field must be a file less then 1MB and PNG or JPG',
  DESCRIPTION_FORMAT: 'Post description field must be a string',
  DESCRIPTION_LENGTH: `Post description field must be less then ${POST_LENGTH_VALUES.DESCRIPTION_LINK_MAX} symbols`,
  QUOTE_LENGTH: `Quote lenght must be from ${POST_LENGTH_VALUES.QUOTE_LENGTH_MIN} to ${POST_LENGTH_VALUES.QUOTE_LENGTH_MAX} symbols`
}

export const POST_FIELD_INFO = {
  TYPE_DESCRIPTION: 'Post type one of: video, text, quote, photo, link.',
  TYPE_EXAMPLE: 'quote',
  TITLE_DESCRIPTION: 'Title of some post with length from 20 to 50',
  TITLE_EXAMPLE: 'Some post title',
  LINK_DESCRIPTION: 'Some url',
  LINK_EXAMPLE: 'https://url.domain/source.html',
  PREVIEW_DESCRIPTION: 'Short text as preview of full info',
  PREVIEW_EXAMPLE: 'Little text',
  TEXT_DESCRIPTION: 'Full text of post',
  TEXT_EXAMPLE: 'Full post text with some infomation',
  AUTHOR_DESCRIPTION: 'Author of some data for post',
  AUTHOR_EXAMPLE: 'Alexandr Pushkin',
  PHOTO_DESCRIPTION: 'Some photo for photo post',
  PHOTO_EXAMPLE: '/usr/local/item.png',
  DESCRIPTION_DESCRIPTION: 'Description about post',
  DESCRIPTION_EXAMPLE: 'Alexandr Pushkin',
  TAGS_DESCRIPTION: 'Array IDs of tags',
  TAGS_EXAMPLE: '[ ad48ef46-6ea6-41c4-a19f-e66b82bdf855 ]',
  USER_ID: 'Some mongo id',
  USER_ID_EXAMPLE: '658170cbb954e9f5b905ccf4',
  LIKES: 'Array of users IDs who make like',
  LIKES_EXAMPLE: '[ 658170cbb954e9f5b905ccf4 ]'
}

export const API = {
  FOUNDED: 'List of posts founded',
  SEARCH: 'Posts by title substring',
  CREATED: 'Create post by dto',
  REPOST: 'Create repost of a some post by id',
  DELETE: 'Delete post by id by owner',
  UPDATE: 'Update post',
  LIKE: 'Toggle like by authorized user',

}
