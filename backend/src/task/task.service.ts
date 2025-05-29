import { Injectable } from '@nestjs/common';
import { TaskRepository } from './task.repository';
import { Prisma } from '@prisma/client'; 
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TaskService {
  constructor(private readonly taskRepo: TaskRepository) {}

  create(createTaskDto: CreateTaskDto) {
    const {
      title,
      description,
      status,
      goalId,
      tagId,
      collaboratorIds,
      subtasks,
    } = createTaskDto;

    const data: Prisma.TaskCreateInput = {
      title,
      description,
      status,
      goal: goalId ? { connect: { id: goalId } } : undefined,
      tag: tagId ? { connect: { id: tagId } } : undefined,
      taskCollaborators: collaboratorIds
        ? {
            create: collaboratorIds.map((userId) => ({
              user: { connect: { id: userId } },
            })),
          }
        : undefined,
      substasks: subtasks ? { create: subtasks } : undefined,
    };

    return this.taskRepo.create(data);
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

