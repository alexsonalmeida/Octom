import { Injectable } from '@nestjs/common';
import { PrismaService } from '../utils/prisma/prisma.service';
import { CreateFileDto } from './dto/create-file.dto';

@Injectable()
export class FileRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(data: CreateFileDto) {
    return this.prisma.file.create({ data });
  }

  findAll() {
    return this.prisma.file.findMany();
  }

  findById(id: string) {
    return this.prisma.file.findUnique({ where: { id } });
  }

  findByViewer(userId: string) {
    return this.prisma.file.findMany({
      where: {
        viewers: {
          some: {
            id: userId,
          },
        },
      },
    });
  }

  delete(id: string) {
    return this.prisma.file.delete({ where: { id } });
  }
}
