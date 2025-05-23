import { Injectable } from '@nestjs/common';
import { TeamRepository } from './team.repository';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';

@Injectable()
export class TeamService {
  constructor(private readonly teamRepository: TeamRepository) {}

  create(dto: CreateTeamDto) {
    return this.teamRepository.create(dto);
  }

  findAll() {
    return this.teamRepository.findAll();
  }

  findOne(id: string) {
    return this.teamRepository.findOne(id);
  }

  update(id: string, dto: UpdateTeamDto) {
    return this.teamRepository.update(id, dto);
  }

  remove(id: string) {
    return this.teamRepository.remove(id);
  }
}

