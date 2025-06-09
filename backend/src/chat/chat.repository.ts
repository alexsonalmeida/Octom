import { Injectable } from '@nestjs/common';
import { PrismaService } from '../utils/prisma/prisma.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { Prisma } from '@prisma/client';

type ChatWithParticipants = Prisma.ChatGetPayload<{
  include: { chatParticipants: true };
}>;

@Injectable()
export class ChatRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(data: CreateChatDto) {
    return this.prisma.chat.create({ data });
  }

  async findPrivateChat(user1Id: string, user2Id: string): Promise<ChatWithParticipants | null> {
      return this.prisma.chat.findFirst({
        where: {
          teamId: null,
          AND: [
            { chatParticipants: { some: { userId: user1Id } } },
            { chatParticipants: { some: { userId: user2Id } } },
          ],
        },
        include: { chatParticipants: true },
      });
    }
    
    async createPrivateChat(user1Id: string, user2Id: string): Promise<ChatWithParticipants> {
      return this.prisma.chat.create({
        data: {
          type: 'private',
          chatParticipants: {
            create: [
              { user: { connect: { id: user1Id } } },
              { user: { connect: { id: user2Id } } },
            ],
          },
        },
        include: { chatParticipants: true },
      });
    }

  async createTeamChat(teamId: string) {
    const existing = await this.prisma.chat.findUnique({ where: { teamId } });
    if (existing) return existing;

    const users = await this.prisma.user.findMany({ where: { teamId } });

    return this.prisma.chat.create({
      data: {
        type: 'team',
        team: { connect: { id: teamId } },
        chatParticipants: {
          create: users.map((user) => ({ user: { connect: { id: user.id } } })),
        },
      },
      include: {
        chatParticipants: true,
        team: true,
      },
    });
  }

  async findTeamChat(teamId: string) {
    return this.prisma.chat.findUnique({ where: { teamId } });
  }

  async getUserChats(userId: string) {
    return this.prisma.chat.findMany({
      where: {
        chatParticipants: {
          some: { userId },
        },
      },
      include: {
        chatParticipants: { include: { user: true } },
        team: true,
        messages: {
          take: 1,
          orderBy: { createdAt: 'desc' },
        },
      },
    });
  }

  findAll() {
    return this.prisma.chat.findMany({
      include: {
        chatParticipants: true,
        messages: true,
      },
    });
  }

  findOne(id: string) {
    return this.prisma.chat.findUnique({
      where: { id },
      include: {
        chatParticipants: true,
        messages: true,
      },
    });
  }

  update(id: string, data: UpdateChatDto) {
    return this.prisma.chat.update({
      where: { id },
      data,
    });
  }

  remove(id: string) {
    return this.prisma.chat.delete({
      where: { id },
    });
  }
}
