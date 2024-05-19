-- CreateEnum
CREATE TYPE "AccessKeyType" AS ENUM ('LIMITED', 'ADMIN');

-- CreateTable
CREATE TABLE "UserAccessKey" (
    "id" TEXT NOT NULL,
    "hash" TEXT NOT NULL,
    "type" "AccessKeyType" NOT NULL,
    "expiry" TIMESTAMP(3) NOT NULL,
    "ratelimit" INTEGER NOT NULL,
    "enabled" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "UserAccessKey_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserAccessKey_hash_key" ON "UserAccessKey"("hash");
