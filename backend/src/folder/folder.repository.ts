import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/utils/prisma/prisma.service';
import { CreateFolderDto } from './dto/create-folder.dto';

@Injectable()
export class FolderRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(data: CreateFolderDto) {
    return this.prisma.folder.create({ data });
  }

  findByTeam(teamId: string) {
    return this.prisma.folder.findMany({
      where: { teamId },
      include: { files: true },
    });
  }

  delete(id: string) {
    return this.prisma.folder.delete({ where: { id } });
  }
}

