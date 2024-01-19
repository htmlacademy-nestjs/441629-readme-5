-- DropIndex
DROP INDEX "posts_title_user_id_idx";

-- AlterTable
ALTER TABLE "posts" ALTER COLUMN "title" DROP NOT NULL,
ALTER COLUMN "link" DROP NOT NULL,
ALTER COLUMN "preview" DROP NOT NULL,
ALTER COLUMN "text" DROP NOT NULL,
ALTER COLUMN "author" DROP NOT NULL,
ALTER COLUMN "photo" DROP NOT NULL,
ALTER COLUMN "description" DROP NOT NULL;

-- CreateIndex
CREATE INDEX "posts_user_id_idx" ON "posts"("user_id");
