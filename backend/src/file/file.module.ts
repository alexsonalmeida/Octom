import { Module } from '@nestjs/common';
import { FileService } from './file.service';
import { FileController } from './file.controller';
import { Prisma } from 'generated/prisma';
import { PrismaService } from 'src/utils/prisma/prisma.service';
import { FileRepository } from './file.repository';

@Module({
  controllers: [FileController],
  providers: [FileService, FileRepository, PrismaService],
})
export class FileModule {}
