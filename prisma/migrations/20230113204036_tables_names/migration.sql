/*
  Warnings:

  - You are about to drop the `Animal` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Service_point` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Transaction` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Animal" DROP CONSTRAINT "Animal_service_point_id_fkey";

-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_service_point_id_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_service_point_id_fkey";

-- DropTable
DROP TABLE "Animal";

-- DropTable
DROP TABLE "Service_point";

-- DropTable
DROP TABLE "Transaction";

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "service_points" (
    "id" SERIAL NOT NULL,
    "desc" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "service_points_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "type" INTEGER NOT NULL DEFAULT 2,
    "service_point_id" INTEGER NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "animals" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "specie" INTEGER NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,
    "sickness" BOOLEAN NOT NULL,
    "desc" TEXT,
    "castrated" BOOLEAN NOT NULL,
    "breed" TEXT NOT NULL,
    "arrivedDate" DATE NOT NULL,
    "service_point_id" INTEGER NOT NULL,

    CONSTRAINT "animals_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "transactions" (
    "id" SERIAL NOT NULL,
    "type" INTEGER NOT NULL,
    "desc" TEXT,
    "value" DOUBLE PRECISION NOT NULL,
    "discharge_date" DATE NOT NULL,
    "service_point_id" INTEGER NOT NULL,

    CONSTRAINT "transactions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_service_point_id_fkey" FOREIGN KEY ("service_point_id") REFERENCES "service_points"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "animals" ADD CONSTRAINT "animals_service_point_id_fkey" FOREIGN KEY ("service_point_id") REFERENCES "service_points"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_service_point_id_fkey" FOREIGN KEY ("service_point_id") REFERENCES "service_points"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
