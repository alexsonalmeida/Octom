import { Injectable } from '@nestjs/common';
import { MessageRepository } from './message.repository';
import { CreateMessageDto } from './dto/create-message.dto';

@Injectable()
export class MessageService {
  constructor(private readonly repository: MessageRepository) {}

  create(dto: CreateMessageDto) {
    return this.repository.create(dto);
  }

  findByChat(chatId: string) {
    return this.repository.findByChat(chatId);
  }

  delete(id: string) {
    return this.repository.delete(id);
  }
}
