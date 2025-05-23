import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { ChatRepository } from './chat.repository';
import { PrismaService } from 'src/utils/prisma/prisma.service';

@Module({
  controllers: [ChatController],
  providers: [ChatService, ChatRepository, PrismaService],
})
export class ChatModule {}
