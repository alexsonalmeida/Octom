-- CreateTable
CREATE TABLE "FileViewer" (
    "fileId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "FileViewer_pkey" PRIMARY KEY ("fileId","userId")
);

-- AddForeignKey
ALTER TABLE "FileViewer" ADD CONSTRAINT "FileViewer_fileId_fkey" FOREIGN KEY ("fileId") REFERENCES "File"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FileViewer" ADD CONSTRAINT "FileViewer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
