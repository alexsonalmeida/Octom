import { Injectable } from '@nestjs/common';
import { PrismaService } from '../utils/prisma/prisma.service';
import { Prisma } from '@prisma/client'; 

@Injectable()
export class TaskRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.TaskCreateInput) {
    return this.prisma.task.create({ data });
  }

  async findAll() {
    return this.prisma.task.findMany({
      include: {
        tag: true,
        goal: true,
        substasks: true,
        taskCollaborators: true,
      },
    });
  }

  async findById(id: string) {
    return this.prisma.task.findUnique({
      where: { id },
      include: {
        tag: true,
        goal: true,
        substasks: true,
        taskCollaborators: true,
      },
    });
  }

  async update(id: string, data: Prisma.TaskUpdateInput) {
    return this.prisma.task.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    return this.prisma.task.delete({
      where: { id },
    });
  }
}
