-- CreateTable
CREATE TABLE "comments" (
    "comment_id" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "post_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "comments_pkey" PRIMARY KEY ("comment_id")
);

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_comment_id_fkey" FOREIGN KEY ("comment_id") REFERENCES "posts"("post_id") ON DELETE CASCADE ON UPDATE CASCADE;
