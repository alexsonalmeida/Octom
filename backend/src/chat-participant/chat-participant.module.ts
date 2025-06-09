import { Module } from '@nestjs/common';
import { ChatParticipantService } from './chat-participant.service';
import { ChatParticipantController } from './chat-participant.controller';
import { ChatParticipantRepository } from './chat-participant.repository';
import { PrismaService } from 'src/utils/prisma/prisma.service';
import { ChatService } from 'src/chat/chat.service';
import { ChatRepository } from 'src/chat/chat.repository';

@Module({
  controllers: [ChatParticipantController],
  providers: [ChatParticipantService, ChatParticipantRepository, PrismaService, ChatService, ChatRepository],
})
export class ChatParticipantModule {}
