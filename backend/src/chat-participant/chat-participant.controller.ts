import { Controller, Post, Body, Get, Param, Delete } from '@nestjs/common';
import { ChatParticipantService } from './chat-participant.service';
import { CreateChatParticipantDto } from './dto/create-chat-participant.dto';

@Controller('chat-participants')
export class ChatParticipantController {
  constructor(private readonly service: ChatParticipantService) {}

  @Post()
  create(@Body() dto: CreateChatParticipantDto) {
    return this.service.create(dto);
  }

  @Get('chat/:chatId')
  findAllByChat(@Param('chatId') chatId: string) {
    return this.service.findAllByChat(chatId);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
