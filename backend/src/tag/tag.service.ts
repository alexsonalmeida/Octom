import { Injectable } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { TagRepository } from './tag.repository';

@Injectable()
export class TagService {
  constructor(private readonly repo: TagRepository) {}

  create(dto: CreateTagDto) {
    return this.repo.create(dto);
  }

  assignToTask(tagId: string, taskId: string) {
    return this.repo.assignToTask(tagId, taskId);
  }

  findAll() {
    return this.repo.findAll();
  }

  findOne(id: string) {
    return this.repo.findOne(id);
  }

  update(id: string, dto: UpdateTagDto) {
    return this.repo.update(id, dto);
  }

  remove(id: string) {
    return this.repo.remove(id);
  }
}
