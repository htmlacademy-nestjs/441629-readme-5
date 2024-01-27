-- AlterTable
ALTER TABLE "posts" ADD COLUMN     "is_published" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "is_repost" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "original_id" TEXT,
ADD COLUMN     "original_user_id" TEXT;
