import { Injectable } from '@nestjs/common';
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

  findById(id: string) {
    return this.repository.findById(id);
  }

  findByViewer(userId: string) {
    return this.repository.findByViewer(userId);
  }

  delete(id: string) {
    return this.repository.delete(id);
  }
}

