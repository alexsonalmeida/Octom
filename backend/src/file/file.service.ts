import { ForbiddenException, Injectable } from '@nestjs/common';
import { FileRepository } from './file.repository';
import { CreateFileDto } from './dto/create-file.dto';

@Injectable()
export class FileService {
  constructor(private readonly repository: FileRepository) {}

  create(dto: CreateFileDto) {
    return this.repository.create(dto);
  }

  findAll() {
    return this.repository.findAll();
  }

  async findById(id: string, userId: string) {
    const file = await this.repository.findById(id);
    const isViewer = file.viewers.some((viewer) => viewer.id === userId);

    if (!isViewer) throw new ForbiddenException('Access denied to this file.');

    return file;
  }

  findByViewer(userId: string) {
    return this.repository.findByViewer(userId);
  }

  delete(id: string) {
    return this.repository.delete(id);
  }
}

