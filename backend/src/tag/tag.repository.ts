import { Injectable } from '@nestjs/common';
import { PrismaService } from '../utils/prisma/prisma.service'; 
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';

@Injectable()
export class TagRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(data: CreateTagDto) {
    return this.prisma.tag.create({ data });
  }

  findAll() {
    return this.prisma.tag.findMany();
  }

  findOne(id: string) {
    return this.prisma.tag.findUnique({ where: { id } });
  }

  findByTaskId(taskId: string) {
    return this.prisma.tag.findUnique({ where: { taskId } });
  }

  update(id: string, data: UpdateTagDto) {
    return this.prisma.tag.update({ where: { id }, data });
  }

  remove(id: string) {
    return this.prisma.tag.delete({ where: { id } });
  }
}