/*
  Warnings:

  - Added the required column `approxAge` to the `animals` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `animals` table without a default value. This is not possible if the table is not empty.
  - Made the column `desc` on table `animals` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "animals" ADD COLUMN     "approxAge" INTEGER NOT NULL,
ADD COLUMN     "user_id" INTEGER NOT NULL,
ALTER COLUMN "desc" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "animals" ADD CONSTRAINT "animals_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
