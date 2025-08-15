/*
  Warnings:

  - You are about to drop the `Chat` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Chat" DROP CONSTRAINT "Chat_user_id_fkey";

-- DropTable
DROP TABLE "public"."Chat";

-- CreateTable
CREATE TABLE "public"."chats" (
    "id" UUID NOT NULL,
    "chat" JSONB NOT NULL,
    "user_id" UUID NOT NULL,

    CONSTRAINT "chats_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."chats" ADD CONSTRAINT "chats_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
