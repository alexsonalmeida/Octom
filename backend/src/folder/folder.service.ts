import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFolderDto } from './dto/create-folder.dto';
import { UpdateFolderDto } from './dto/update-folder.dto';
import { FolderRepository } from './folder.repository';

@Injectable()
export class FolderService {
  constructor(private readonly repository: FolderRepository) {}

  create(dto: CreateFolderDto) {
    return this.repository.create(dto);
  }

  findByTeam(teamId: string) {
    return this.repository.findByTeam(teamId);
  }

  delete(id: string) {
    return this.repository.delete(id);
  }
}


