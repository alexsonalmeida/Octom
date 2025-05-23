import { Module } from '@nestjs/common';
import { TaskCollaboratorService } from './task-collaborator.service';
import { TaskCollaboratorController } from './task-collaborator.controller';
import { TaskCollaboratorRepository } from './task-collaborator.repository';
import { PrismaService } from 'src/utils/prisma/prisma.service';

@Module({
  controllers: [TaskCollaboratorController],
  providers: [TaskCollaboratorService, TaskCollaboratorRepository, PrismaService],
})
export class TaskCollaboratorModule {}
