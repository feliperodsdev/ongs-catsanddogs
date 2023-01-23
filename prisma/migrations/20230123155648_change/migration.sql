-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_service_point_id_fkey";

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "service_point_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_service_point_id_fkey" FOREIGN KEY ("service_point_id") REFERENCES "service_points"("id") ON DELETE SET NULL ON UPDATE CASCADE;
