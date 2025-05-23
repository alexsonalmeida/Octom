import { Injectable } from '@nestjs/common';
import { PrismaService } from '../utils/prisma/prisma.service';
import { CreateSubtaskDto } from './dto/create-subtask.dto';
import { UpdateSubtaskDto } from './dto/update-subtask.dto';

@Injectable()
export class SubtaskRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(data: CreateSubtaskDto) {
    return this.prisma.subtask.create({ data });
  }

  findAll() {
    return this.prisma.subtask.findMany();
  }

  findOne(id: string) {
    return this.prisma.subtask.findUnique({ where: { id } });
  }

  findByTaskId(taskId: string) {
    return this.prisma.subtask.findMany({ where: { taskId } });
  }

  update(id: string, data: UpdateSubtaskDto) {
    return this.prisma.subtask.update({ where: { id }, data });
  }

  remove(id: string) {
    return this.prisma.subtask.delete({ where: { id } });
  }
}
