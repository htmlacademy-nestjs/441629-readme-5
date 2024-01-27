/*
  Warnings:

  - You are about to drop the column `original_id` on the `posts` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "posts" DROP COLUMN "original_id",
ADD COLUMN     "original_post_id" TEXT;
