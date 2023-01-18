/*
  Warnings:

  - Made the column `service_point_id` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_service_point_id_fkey";

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "service_point_id" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_service_point_id_fkey" FOREIGN KEY ("service_point_id") REFERENCES "service_points"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
