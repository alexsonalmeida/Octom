import { Injectable } from '@nestjs/common';
import { CreateSubtaskDto } from './dto/create-subtask.dto';
import { UpdateSubtaskDto } from './dto/update-subtask.dto';
import { SubtaskRepository } from './subtask.repository';

@Injectable()
export class SubtaskService {
  constructor(private readonly repo: SubtaskRepository) {}

  create(dto: CreateSubtaskDto) {
    return this.repo.create(dto);
  }

  findAll() {
    return this.repo.findAll();
  }

  findOne(id: string) {
    return this.repo.findOne(id);
  }

  findByTaskId(taskId: string) {
    return this.repo.findByTaskId(taskId);
  }

  update(id: string, dto: UpdateSubtaskDto) {
    return this.repo.update(id, dto);
  }

  remove(id: string) {
    return this.repo.remove(id);
  }
}
