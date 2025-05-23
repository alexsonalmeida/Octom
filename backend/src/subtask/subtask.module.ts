import { Module } from '@nestjs/common';
import { SubtaskService } from './subtask.service';
import { SubtaskController } from './subtask.controller';
import { SubtaskRepository } from './subtask.repository';
import { PrismaService } from 'src/utils/prisma/prisma.service';

@Module({
  controllers: [SubtaskController],
  providers: [SubtaskService, SubtaskRepository, PrismaService],
})
export class SubtaskModule {}
