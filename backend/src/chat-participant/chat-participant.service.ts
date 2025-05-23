import { Injectable, NotFoundException } from '@nestjs/common';
import { ChatParticipantRepository } from './chat-participant.repository';
import { CreateChatParticipantDto } from './dto/create-chat-participant.dto';

@Injectable()
export class ChatParticipantService {
  constructor(private readonly repository: ChatParticipantRepository) {}

  create(dto: CreateChatParticipantDto) {
    return this.repository.create(dto);
  }

  findAllByChat(chatId: string) {
    return this.repository.findAllByChatId(chatId);
  }

  async remove(id: string) {
    return this.repository.remove(id);
  }
}
