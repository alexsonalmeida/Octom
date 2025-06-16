/*
  Warnings:

  - You are about to drop the `_FileViewers` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `teamId` to the `File` table without a default value. This is not possible if the table is not empty.
  - Added the required column `teamId` to the `Folder` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_FileViewers" DROP CONSTRAINT "_FileViewers_A_fkey";

-- DropForeignKey
ALTER TABLE "_FileViewers" DROP CONSTRAINT "_FileViewers_B_fkey";

-- AlterTable
ALTER TABLE "File" ADD COLUMN     "teamId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Folder" ADD COLUMN     "teamId" TEXT NOT NULL;

-- DropTable
DROP TABLE "_FileViewers";

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Folder" ADD CONSTRAINT "Folder_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
