import { ForbiddenException, Injectable } from '@nestjs/common';
import { FileRepository } from './file.repository';
import { CreateFileDto } from './dto/create-file.dto';

@Injectable()
export class FileService {
  constructor(private readonly repository: FileRepository) {}

  create(dto: CreateFileDto) {
    return this.repository.create(dto);
  }

  findByTeam(teamId: string) {
    return this.repository.findByTeam(teamId);
  }

  findById(id: string) {
    return this.repository.findById(id);
  }

  delete(id: string) {
    return this.repository.delete(id);
  }
}


