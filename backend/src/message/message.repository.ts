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

  delete(id: string) {
    return this.prisma.message.delete({ where: { id } });
  }
}
