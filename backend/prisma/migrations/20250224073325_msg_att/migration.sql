/*
  Warnings:

  - You are about to drop the column `userId` on the `Mensagem` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Mensagem" DROP CONSTRAINT "Mensagem_userId_fkey";

-- AlterTable
ALTER TABLE "Mensagem" DROP COLUMN "userId",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
