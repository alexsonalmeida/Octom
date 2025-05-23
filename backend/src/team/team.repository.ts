import { Injectable } from '@nestjs/common';
import { PrismaService } from '../utils/prisma/prisma.service';
import { Prisma, Team } from '@prisma/client';

@Injectable()
export class TeamRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(data: Prisma.TeamCreateInput): Promise<Team> {
    return this.prisma.team.create({ data });
  }

  findAll(): Promise<Team[]> {
    return this.prisma.team.findMany({ include: { users: true, chat: true } });
  }

  findOne(id: string): Promise<Team | null> {
    return this.prisma.team.findUnique({
      where: { id },
      include: { users: true, chat: true },
    });
  }

  update(id: string, data: Prisma.TeamUpdateInput): Promise<Team> {
    return this.prisma.team.update({ where: { id }, data });
  }

  remove(id: string): Promise<Team> {
    return this.prisma.team.delete({ where: { id } });
  }
}
