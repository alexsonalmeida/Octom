import { Module } from '@nestjs/common';
import { ChatParticipantService } from './chat-participant.service';
import { ChatParticipantController } from './chat-participant.controller';
import { ChatParticipantRepository } from './chat-participant.repository';
import { PrismaService } from 'src/utils/prisma/prisma.service';

@Module({
  controllers: [ChatParticipantController],
  providers: [ChatParticipantService, ChatParticipantRepository, PrismaService],
})
export class ChatParticipantModule {}
