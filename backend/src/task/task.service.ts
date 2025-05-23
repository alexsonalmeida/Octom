import { Injectable } from '@nestjs/common';
import { TaskRepository } from './task.repository';
import { Prisma } from '@prisma/client'; 

@Injectable()
export class TaskService {
  constructor(private readonly taskRepo: TaskRepository) {}

  create(data: Prisma.TaskCreateInput) {
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
