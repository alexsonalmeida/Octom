import { Injectable } from '@nestjs/common';
import { PrismaService } from '../utils/prisma/prisma.service';
import { Prisma } from '@prisma/client'; 

@Injectable()
export class TaskRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.TaskCreateInput) {
    return this.prisma.task.create({
      data,
      include: {
        tag: true,
        goal: true,
        substasks: true,
        taskCollaborators: { include: { user: true } },
      },
    });
  }

  async findAll() {
    return this.prisma.task.findMany({
      include: {
        tag: true,
        goal: true,
        substasks: true,
        taskCollaborators: { include: { user: true } },
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
        taskCollaborators: { include: { user: true } },
      },
    });
  }

  async findTasksByUserSince(userId: string, fromDate: Date) {
    return this.prisma.task.findMany({
      where: {
        taskCollaborators: {
          some: { userId },
        },
        updatedAt: {
          gte: fromDate,
        },
      },
    });
  }

  async findTeamTasksSince(teamId: string, fromDate: Date) {
    return this.prisma.task.findMany({
      where: {
        teamId,
        updatedAt: {
          gte: fromDate,
        },
      },
    });
  }
  
  async findCompletedTasksByUserBetween(userId: string, from: Date, to: Date) {
    return this.prisma.task.findMany({
      where: {
        taskCollaborators: {
          some: { userId },
        },
        status: 'done',
        updatedAt: {
          gte: from,
          lte: to,
        },
      },
    });
  }


  async update(id: string, data: Prisma.TaskUpdateInput) {
    return this.prisma.task.update({
      where: { id },
      data,
      include: {
        tag: true,
        goal: true,
        substasks: true,
        taskCollaborators: { include: { user: true } },
      },
    });
  }

  async findTasksByUser(userId: string, status?: string) {
    return this.prisma.task.findMany({
      where: {
        taskCollaborators: { some: { userId } },
        ...(status ? { status } : {}),
      },
      include: {
        tag: true,
        goal: true,
        substasks: true,
        taskCollaborators: { include: { user: true } },
      },
      orderBy: { updatedAt: 'desc' },
    });
  }

  async delete(id: string) {
    return this.prisma.task.delete({
      where: { id },
    });
  }
}
