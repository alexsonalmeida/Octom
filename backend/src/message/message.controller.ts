import { Controller, Post, Body, Get, Param, Delete } from '@nestjs/common';
import { MessageService } from './message.service';
import { CreateMessageDto } from './dto/create-message.dto';

@Controller('messages')
export class MessageController {
  constructor(private readonly service: MessageService) {}

  @Post()
  create(@Body() dto: CreateMessageDto) {
    return this.service.create(dto);
  }

  @Post()
  sendMessage(@Body() body: { chatId: string; senderId: string; text: string }) {
    return this.service.sendMessage(body.chatId, body.senderId, body.text);
  }

  @Get(':chatId')
  getMessages(@Param('chatId') chatId: string) {
    return this.service.getMessages(chatId);
  }

  @Get('chat/:chatId')
  findByChat(@Param('chatId') chatId: string) {
    return this.service.findByChat(chatId);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.service.delete(id);
  }
}
