import { PrismaClient } from '@prisma/client';

const FIRST_TAG_UUID = '39614113-7ad5-45b6-8093-06455437e1e2';
const SECOND_TAG_UUID = 'efd775e2-df55-4e0e-a308-58249f5ea202';

const FIRST_POST_UUID = '6d308040-96a2-4162-bea6-2338e9976540';
const SECOND_POST_UUID = 'ab04593b-da99-4fe3-8b4b-e06d82e2efdd';

const FIRST_USER_ID = '658170cbb954e9f5b905ccf4';
const SECOND_USER_ID = '6581762309c030b503e30512';

function getTags() {
  return [
    { id: FIRST_TAG_UUID, title: 'Интересно' },
    { id: SECOND_TAG_UUID, title: 'Чехов' }
  ];
}

function getPosts() {
  return [
    {
      id: FIRST_POST_UUID,
      title: 'Тестовая публикация',
      userId: FIRST_USER_ID,
      postType: 'text',
      preview: 'Интересное начало',
      text: 'Расширенное содержание публикации',
      link: '',
      photo: '',
      description: '',
      tags: {
        connect: [{ id: FIRST_TAG_UUID }]
      },
      comments: [
        {
          message: 'Тест',
          userId: FIRST_USER_ID,
        }
      ]
    },
    {
      id: SECOND_POST_UUID,
      userId: FIRST_USER_ID,
      postType: 'quote',
      text: 'Полезная книга по JavaScript',
      author: 'Programmer',
      tags: {
        connect: [
          { id: FIRST_TAG_UUID },
          { id: SECOND_TAG_UUID },
        ]
      },
      comments: [
          {
            message: 'Это действительно отличная книга!',
            userId: FIRST_USER_ID,
          },
          {
            message: 'Надо будет обязательно перечитать. Слишком много информации.',
            userId: SECOND_USER_ID,
          },
      ]
    }
  ]
}

async function seedDb(prismaClient: PrismaClient) {
  const mockTags = getTags();
  for (const tag of mockTags) {
    await prismaClient.tag.upsert({
      where: { id: tag.title },
      update: {},
      create: {
        title: tag.title,
      }
    });
  }

  const mockPosts = getPosts();
  for (const post of mockPosts) {
    await prismaClient.post.create({
      data: {
        id: post.id,
        postType: post.postType,
        title: post.title || '',
        link: post.link || '',
        preview: post.preview || '',
        text: post.text || '',
        author: post.author || '',
        photo: post.photo || '',
        description: post.description || '',
        userId: post.userId,
        comments: post.comments ? {
          create: post.comments
        } : undefined
      }
    })
  }

  console.info('🤘️ Database was filled');
}

async function bootstrap() {
  const prismaClient = new PrismaClient();

  try {
    await seedDb(prismaClient);
    globalThis.process.exit(0);
  } catch (error: unknown) {
    console.error(error);
    globalThis.process.exit(1);
  } finally {
    await prismaClient.$disconnect();
  }
}

bootstrap();
