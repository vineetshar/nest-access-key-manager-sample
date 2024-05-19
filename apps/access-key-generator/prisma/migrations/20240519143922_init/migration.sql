-- CreateEnum
CREATE TYPE "AccessKeyType" AS ENUM ('LIMITED', 'ADMIN');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserAccessKey" (
    "id" TEXT NOT NULL,
    "hash" TEXT NOT NULL,
    "type" "AccessKeyType" NOT NULL,
    "expiry" TIMESTAMP(3) NOT NULL,
    "ratelimit" INTEGER NOT NULL,

    CONSTRAINT "UserAccessKey_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "UserAccessKey_hash_key" ON "UserAccessKey"("hash");
