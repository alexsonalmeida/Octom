import { Injectable } from '@nestjs/common';
import { PrismaService } from '../utils/prisma/prisma.service';
import { CreateFileDto } from './dto/create-file.dto';

@Injectable()
export class FileRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateFileDto) {
    const { viewerIds, ...fileData } = data;

    const createdFile = await this.prisma.file.create({
      data: fileData,
    });

    if (viewerIds && viewerIds.length > 0) {
      const viewerRecords = viewerIds.map((userId) => ({
        fileId: createdFile.id,
        userId,
      }));

      await this.prisma.fileViewer.createMany({
        data: viewerRecords,
        skipDuplicates: true,
      });
    }

    return createdFile;
  }

  findByTeam(teamId: string) {
    return this.prisma.file.findMany({
      where: { teamId },
      include: { folder: true },
    });
  }

  findById(id: string) {
    return this.prisma.file.findUnique({
      where: { id },
      include: { folder: true },
    });
  }

  delete(id: string) {
    return this.prisma.file.delete({ where: { id } });
  }
}


