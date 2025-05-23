import { Injectable } from '@nestjs/common';
import { PrismaService } from '../utils/prisma/prisma.service';
import { CreateTaskCollaboratorDto } from './dto/create-task-collaborator.dto';

@Injectable()
export class TaskCollaboratorRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateTaskCollaboratorDto) {
    return this.prisma.taskCollaborators.create({ data });
  }

  async remove(userId: string, taskId: string) {
    return this.prisma.taskCollaborators.delete({
      where: {
        userId_taskId: { userId, taskId },
      },
    });
  }

  async findByTask(taskId: string) {
    return this.prisma.taskCollaborators.findMany({
      where: { taskId },
      include: { user: true },
    });
  }

  async findByUser(userId: string) {
    return this.prisma.taskCollaborators.findMany({
      where: { userId },
      include: { task: true },
    });
  }
}
