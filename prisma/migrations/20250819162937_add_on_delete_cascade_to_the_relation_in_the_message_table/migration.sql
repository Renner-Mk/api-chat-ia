-- DropForeignKey
ALTER TABLE "public"."messages" DROP CONSTRAINT "messages_chat_id_fkey";

-- AddForeignKey
ALTER TABLE "public"."messages" ADD CONSTRAINT "messages_chat_id_fkey" FOREIGN KEY ("chat_id") REFERENCES "public"."chats"("id") ON DELETE CASCADE ON UPDATE CASCADE;
