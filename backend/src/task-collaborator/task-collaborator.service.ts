import { Injectable } from '@nestjs/common';
import { CreateTaskCollaboratorDto } from './dto/create-task-collaborator.dto';
import { TaskCollaboratorRepository } from './task-collaborator.repository';

@Injectable()
export class TaskCollaboratorService {
  constructor(private readonly repo: TaskCollaboratorRepository) {}

  create(dto: CreateTaskCollaboratorDto) {
    return this.repo.create(dto);
  }

  remove(userId: string, taskId: string) {
    return this.repo.remove(userId, taskId);
  }

  findCollaboratorsByTask(taskId: string) {
    return this.repo.findByTask(taskId);
  }

  findTasksByUser(userId: string) {
    return this.repo.findByUser(userId);
  }
}
