import { Module } from '@nestjs/common';
import { GoalService } from './goal.service';
import { GoalController } from './goal.controller';
import { GoalRepository } from './goal.repository';
import { PrismaService } from 'src/utils/prisma/prisma.service';

@Module({
  controllers: [GoalController],
  providers: [GoalService, GoalRepository, PrismaService],
})
export class GoalModule {}
