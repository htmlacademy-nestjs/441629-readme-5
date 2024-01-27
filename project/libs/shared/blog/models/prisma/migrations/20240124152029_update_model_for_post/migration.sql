-- AlterTable
ALTER TABLE "posts" ADD COLUMN     "likes" TEXT[] DEFAULT ARRAY[]::TEXT[];
