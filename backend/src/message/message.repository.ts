import { Injectable } from '@nestjs/common';
import { PrismaService } from '../utils/prisma/prisma.service';
import { CreateMessageDto } from './dto/create-message.dto';

@Injectable()
export class MessageRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(data: CreateMessageDto) {
    return this.prisma.message.create({
      data,
      include: {
        sender: true,
        chat: true,
        file: true,
      },
    });
  }

  findByChat(chatId: string) {
    return this.prisma.message.findMany({
      where: { chatId },
      include: {
        sender: true,
        file: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }


  async sendMessage(chatId: string, senderId: string, text: string) {
    return this.prisma.message.create({
      data: {
        text,
        chat: { connect: { id: chatId } },
        sender: { connect: { id: senderId } },
      },
    });
  }

  async getMessages(chatId: string) {
    return this.prisma.message.findMany({
      where: { chatId },
      orderBy: { createdAt: 'asc' },
      include: { sender: true },
    });
  }

  delete(id: string) {
    return this.prisma.message.delete({ where: { id } });
  }
}
