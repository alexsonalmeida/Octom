import { Injectable, NotFoundException } from '@nestjs/common';
import { ChatRepository } from './chat.repository';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';

@Injectable()
export class ChatService {
  constructor(private readonly chatRepository: ChatRepository) {}

  create(dto: CreateChatDto) {
    return this.chatRepository.create(dto);
  }

  async createPrivateChat(user1Id: string, user2Id: string) {
    const existing = await this.chatRepository.findPrivateChat(user1Id, user2Id);
    if (existing) return existing;
    return this.chatRepository.createPrivateChat(user1Id, user2Id);
  }

  async createTeamChat(teamId: string) {
    return this.chatRepository.createTeamChat(teamId);
  }

  async getUserChats(userId: string) {
    return this.chatRepository.getUserChats(userId);
  }

  async getChatMessages(chatId: string) {
    return this.chatRepository.getChatMessages(chatId);
  }

  findAll() {
    return this.chatRepository.findAll();
  }

  async findOne(id: string) {
    const chat = await this.chatRepository.findOne(id);
    if (!chat) throw new NotFoundException('Chat not found');
    return chat;
  }

  async update(id: string, dto: UpdateChatDto) {
    await this.findOne(id);
    return this.chatRepository.update(id, dto);
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.chatRepository.remove(id);
  }
}

