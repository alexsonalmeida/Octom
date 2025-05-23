import { Module } from '@nestjs/common';
import { TeamController } from './team.controller';
import { TeamService } from './team.service';
import { TeamRepository } from './team.repository';
import { PrismaService } from '../utils/prisma/prisma.service';

@Module({
  controllers: [TeamController],
  providers: [TeamService, TeamRepository, PrismaService],
})
export class TeamModule {}

