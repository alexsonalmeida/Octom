import { ForbiddenException, Injectable } from '@nestjs/common';
import { MessageRepository } from './message.repository';
import { CreateMessageDto } from './dto/create-message.dto';
import { ChatService } from 'src/chat/chat.service';

@Injectable()
export class MessageService {
  constructor(private readonly repository: MessageRepository, private readonly chatService: ChatService) {}

  create(dto: CreateMessageDto) {
    return this.repository.create(dto);
  }

  sendMessage(chatId: string, senderId: string, text: string) {
    return this.repository.sendMessage(chatId, senderId, text);
  }

  async sendPrivateMassage(senderId: string, recipientId: string, text: string) {
    const chat = await this.chatService.createPrivateChat(
      senderId,
      recipientId,
    );

    // segurança extra: garante que o sender pertence ao chat
    const participants = chat.chatParticipants.map((p) => p.userId);
    if (!participants.includes(senderId)) {
      throw new ForbiddenException('Você não faz parte deste chat.');
    }

    return this.sendMessage(chat.id, senderId, text);
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
