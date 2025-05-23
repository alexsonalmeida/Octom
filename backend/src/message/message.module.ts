import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';
import { MessageRepository } from './message.repository';
import { PrismaService } from 'src/utils/prisma/prisma.service';

@Module({
  controllers: [MessageController],
  providers: [MessageService, MessageRepository, PrismaService],
})
export class MessageModule {}
