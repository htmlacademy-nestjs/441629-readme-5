import { Prisma } from '@prisma/client';

export interface ITagFilter {
  id?: string;
  title?: string;
}

export function tagFilterToPrismaFilter(filter: ITagFilter): Prisma.TagWhereInput | undefined {
  if (!filter) {
    return undefined;
  }

  let prismaFilter: Prisma.TagWhereInput = {};

  if (filter.title) {
    prismaFilter = { title: filter.title };
  }

  return prismaFilter;
}
