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

