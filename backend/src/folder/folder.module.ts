import { Module } from '@nestjs/common';
import { FolderService } from './folder.service';
import { FolderController } from './folder.controller';
import { PrismaService } from 'src/utils/prisma/prisma.service';
import { FolderRepository } from './folder.repository';

@Module({
  controllers: [FolderController],
  providers: [FolderService, FolderRepository, PrismaService],
})
export class FolderModule {}
