/*
  Warnings:

  - The primary key for the `tags` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `tag_id` on the `tags` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "_PostToTag" DROP CONSTRAINT "_PostToTag_B_fkey";

-- DropIndex
DROP INDEX "posts_title_idx";

-- AlterTable
ALTER TABLE "tags" DROP CONSTRAINT "tags_pkey",
DROP COLUMN "tag_id",
ADD CONSTRAINT "tags_pkey" PRIMARY KEY ("title");

-- CreateIndex
CREATE INDEX "posts_title_user_id_idx" ON "posts"("title", "user_id");

-- AddForeignKey
ALTER TABLE "_PostToTag" ADD CONSTRAINT "_PostToTag_B_fkey" FOREIGN KEY ("B") REFERENCES "tags"("title") ON DELETE CASCADE ON UPDATE CASCADE;
