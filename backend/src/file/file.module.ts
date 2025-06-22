import { Module } from '@nestjs/common';
import { FileService } from './file.service';
import { FileController } from './file.controller';
import { Prisma } from 'generated/prisma';
import { PrismaService } from 'src/utils/prisma/prisma.service';
import { FileRepository } from './file.repository';
import { SupabaseService } from 'src/services/supabase.service';
import { FolderService } from 'src/folder/folder.service';
import { FolderRepository } from 'src/folder/folder.repository';

@Module({
  controllers: [FileController],
  providers: [
    FileService, 
    FileRepository, 
    PrismaService, 
    SupabaseService, 
    FolderService, 
    FolderRepository
  ],
})
export class FileModule {}
