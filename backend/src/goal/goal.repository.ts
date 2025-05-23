import { Injectable } from '@nestjs/common';
import { PrismaService } from '../utils/prisma/prisma.service';
import { CreateGoalDto } from './dto/create-goal.dto';
import { UpdateGoalDto } from './dto/update-goal.dto';

@Injectable()
export class GoalRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(data: CreateGoalDto) {
    return this.prisma.goal.create({ data });
  }

  findAll() {
    return this.prisma.goal.findMany({
      include: { tasks: true },
    });
  }

  findOne(id: string) {
    return this.prisma.goal.findUnique({
      where: { id },
      include: { tasks: true },
    });
  }

  update(id: string, data: UpdateGoalDto) {
    return this.prisma.goal.update({
      where: { id },
      data,
    });
  }

  remove(id: string) {
    return this.prisma.goal.delete({
      where: { id },
    });
  }
}
