/*
  Warnings:

  - You are about to drop the column `taskId` on the `Tag` table. All the data in the column will be lost.
  - You are about to drop the column `goalId` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the `Goal` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Tag" DROP CONSTRAINT "Tag_taskId_fkey";

-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_goalId_fkey";

-- DropIndex
DROP INDEX "Tag_taskId_key";

-- AlterTable
ALTER TABLE "Tag" DROP COLUMN "taskId";

-- AlterTable
ALTER TABLE "Task" DROP COLUMN "goalId";

-- DropTable
DROP TABLE "Goal";

-- CreateTable
CREATE TABLE "_TaskTags" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_TaskTags_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_TaskTags_B_index" ON "_TaskTags"("B");

-- AddForeignKey
ALTER TABLE "_TaskTags" ADD CONSTRAINT "_TaskTags_A_fkey" FOREIGN KEY ("A") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TaskTags" ADD CONSTRAINT "_TaskTags_B_fkey" FOREIGN KEY ("B") REFERENCES "Task"("id") ON DELETE CASCADE ON UPDATE CASCADE;
