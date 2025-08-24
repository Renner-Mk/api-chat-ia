-- DropForeignKey
ALTER TABLE "public"."chats" DROP CONSTRAINT "chats_user_id_fkey";

-- AddForeignKey
ALTER TABLE "public"."chats" ADD CONSTRAINT "chats_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
