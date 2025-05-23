import { Module } from '@nestjs/common';
import { TagService } from './tag.service';
import { TagController } from './tag.controller';
import { TagRepository } from './tag.repository';
import { PrismaService } from 'src/utils/prisma/prisma.service';

@Module({
  controllers: [TagController],
  providers: [TagService, TagRepository, PrismaService],
})
export class TagModule {}
