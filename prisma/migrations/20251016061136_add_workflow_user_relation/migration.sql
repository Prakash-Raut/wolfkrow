/*
  Warnings:

  - A unique constraint covering the columns `[name,userId]` on the table `workflow` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updatedAt` to the `workflow` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `workflow` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "workflow" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "workflow_name_userId_key" ON "workflow"("name", "userId");

-- AddForeignKey
ALTER TABLE "workflow" ADD CONSTRAINT "workflow_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
