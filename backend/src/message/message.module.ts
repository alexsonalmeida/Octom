import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';
import { MessageRepository } from './message.repository';
import { PrismaService } from 'src/utils/prisma/prisma.service';
import { ChatService } from 'src/chat/chat.service';
import { ChatRepository } from 'src/chat/chat.repository';

@Module({
  controllers: [MessageController],
  providers: [MessageService, MessageRepository, PrismaService, ChatService, ChatRepository],
})
export class MessageModule {}
