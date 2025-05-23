import { Injectable } from '@nestjs/common';
import { PrismaService } from '../utils/prisma/prisma.service';
import { CreateChatParticipantDto } from './dto/create-chat-participant.dto';

@Injectable()
export class ChatParticipantRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(data: CreateChatParticipantDto) {
    return this.prisma.chatParticipant.create({ data });
  }

  findAllByChatId(chatId: string) {
    return this.prisma.chatParticipant.findMany({
      where: { chatId },
      include: {
        user: true,
      },
    });
  }

  remove(id: string) {
    return this.prisma.chatParticipant.delete({
      where: { id },
    });
  }
}
