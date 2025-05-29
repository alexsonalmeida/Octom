import { Injectable } from '@nestjs/common';
import { MessageRepository } from './message.repository';
import { CreateMessageDto } from './dto/create-message.dto';

@Injectable()
export class MessageService {
  constructor(private readonly repository: MessageRepository) {}

  create(dto: CreateMessageDto) {
    return this.repository.create(dto);
  }

  sendMessage(chatId: string, senderId: string, text: string) {
    return this.repository.sendMessage(chatId, senderId, text);
  }

  getMessages(chatId: string) {
    return this.repository.getMessages(chatId);
  }

  findByChat(chatId: string) {
    return this.repository.findByChat(chatId);
  }

  delete(id: string) {
    return this.repository.delete(id);
  }
}
