-- CreateTable
CREATE TABLE "Service_point" (
    "id" SERIAL NOT NULL,
    "desc" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Service_point_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "type" INTEGER NOT NULL DEFAULT 2,
    "service_point_id" INTEGER NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Animal" (
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

    CONSTRAINT "Animal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transaction" (
    "id" SERIAL NOT NULL,
    "type" INTEGER NOT NULL,
    "desc" TEXT,
    "value" DOUBLE PRECISION NOT NULL,
    "discharge_date" DATE NOT NULL,
    "service_point_id" INTEGER NOT NULL,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_service_point_id_fkey" FOREIGN KEY ("service_point_id") REFERENCES "Service_point"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Animal" ADD CONSTRAINT "Animal_service_point_id_fkey" FOREIGN KEY ("service_point_id") REFERENCES "Service_point"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_service_point_id_fkey" FOREIGN KEY ("service_point_id") REFERENCES "Service_point"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
