import { Injectable } from '@nestjs/common';
import { TaskRepository } from './task.repository';
import { Prisma } from '@prisma/client'; 
import { CreateTaskDto } from './dto/create-task.dto';
import { startOfDay, startOfWeek, startOfMonth, formatISO, subWeeks, eachDayOfInterval, eachWeekOfInterval, eachMonthOfInterval } from 'date-fns';

@Injectable()
export class TaskService {
  constructor(private readonly taskRepo: TaskRepository) {}

  create(createTaskDto: CreateTaskDto) {
    const {
      title,
      description,
      status,
      tagIds,
      teamId,
      collaboratorIds,
      subtasks,
      createdAt, 
      updatedAt,
    } = createTaskDto;

  const data: Prisma.TaskCreateInput = {
    title,
    description,
    status,
    team: { connect: { id: teamId } },
    tags: tagIds && tagIds.length > 0 ? {
      connect: tagIds.map((id) => ({ id })),
    } : undefined,
    taskCollaborators: collaboratorIds
      ? {
          create: collaboratorIds.map((userId) => ({
            user: { connect: { id: userId } },
          })),
        }
      : undefined,
    substasks: subtasks ? { create: subtasks } : undefined,
    createdAt: createdAt ? new Date(createdAt) : undefined,
    updatedAt: updatedAt ? new Date(updatedAt) : undefined,
  };

    return this.taskRepo.create(data);
  }

  async getDashboard(userId: string) {
    const now = new Date();
    const getWeekStart = (date: Date) =>
      formatISO(startOfWeek(date, { weekStartsOn: 1 }), { representation: 'date' });

    const weeks = [0, 1, 2].map((i) => {
      const weekDate = subWeeks(now, 2 - i);
      return getWeekStart(weekDate);
    });

    const stats: Record<
      string,
      {
        completedUserTasks: number;
        openUserTasks: number;
        completedTeamTasks: number;
      }
    > = {};

    for (const week of weeks) {
      stats[week] = {
        completedUserTasks: 0,
        openUserTasks: 0,
        completedTeamTasks: 0,
      };
    }

    const fromDate = subWeeks(now, 3);
    const userTasks = await this.taskRepo.findTasksByUserSince(userId, fromDate);
    const teamId = userTasks[0]?.teamId;

    const teamTasks = teamId
      ? await this.taskRepo.findTeamTasksSince(teamId, fromDate)
      : [];

    for (const task of userTasks) {
      const week = getWeekStart(new Date(task.updatedAt));
      if (!stats[week]) continue;

      if (task.status === 'done') stats[week].completedUserTasks++;
      else stats[week].openUserTasks++;
    }

    for (const task of teamTasks) {
      const week = getWeekStart(new Date(task.updatedAt));
      if (!stats[week]) continue;

      if (task.status === 'done') stats[week].completedTeamTasks++;
    }

    const sortedWeeks = weeks.map((week) => ({
      week,
      ...stats[week],
    }));

    return { data: sortedWeeks };
  }

  async getCompletedTasksStats(userId: string, from: Date, to: Date, resolution: 'daily' | 'weekly' | 'monthly') {
    const userTasks = await this.taskRepo.findCompletedTasksByUserBetween(userId, from, to);

    const getPeriodKey = (date: Date): string => {
      if (resolution === 'daily') return formatISO(startOfDay(date), { representation: 'date' });
      if (resolution === 'weekly') return formatISO(startOfWeek(date, { weekStartsOn: 1 }), { representation: 'date' });
      if (resolution === 'monthly') return formatISO(startOfMonth(date), { representation: 'date' });
      return '';
    };

    const generatePeriods = (): string[] => {
      if (resolution === 'daily') {
        return eachDayOfInterval({ start: from, end: to }).map((d) =>
          formatISO(startOfDay(d), { representation: 'date' })
        );
      }
      if (resolution === 'weekly') {
        return eachWeekOfInterval({ start: from, end: to }, { weekStartsOn: 1 }).map((d) =>
          formatISO(startOfWeek(d, { weekStartsOn: 1 }), { representation: 'date' })
        );
      }
      if (resolution === 'monthly') {
        return eachMonthOfInterval({ start: from, end: to }).map((d) =>
          formatISO(startOfMonth(d), { representation: 'date' })
        );
      }
      return [];
    };

    const periods = generatePeriods();
    const stats: Record<string, number> = {};
    for (const period of periods) {
      stats[period] = 0;
    }

    for (const task of userTasks) {
      const period = getPeriodKey(new Date(task.updatedAt));
      if (stats[period] !== undefined) {
        stats[period]++;
      }
    }

    const result = periods.map((period) => ({
      period,
      count: stats[period] || 0,
    }));
    return { data: result };
  }

  async getTasksByTeam(teamId: string, status?: string) {
    return this.taskRepo.findTasksByTeam(teamId, status);
  }

  async getTasksByUser(userId: string, status?: string) {
    return this.taskRepo.findTasksByUser(userId, status);
  }

  findAll() {
    return this.taskRepo.findAll();
  }

  findById(id: string) {
    return this.taskRepo.findById(id);
  }

  update(id: string, data: Prisma.TaskUpdateInput) {
    return this.taskRepo.update(id, data);
  }

  delete(id: string) {
    return this.taskRepo.delete(id);
  }
}

