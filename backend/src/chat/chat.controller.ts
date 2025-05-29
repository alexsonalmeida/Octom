import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';

@Controller('chats')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post()
  create(@Body() dto: CreateChatDto) {
    return this.chatService.create(dto);
  }

  @Post('private')
  createPrivate(@Body() body: { user1Id: string; user2Id: string }) {
    return this.chatService.createPrivateChat(body.user1Id, body.user2Id);
  }

  @Post('team/:teamId')
  createTeam(@Param('teamId') teamId: string) {
    return this.chatService.createTeamChat(teamId);
  }

  @Get('user/:userId')
  getUserChats(@Param('userId') userId: string) {
    return this.chatService.getUserChats(userId);
  }

  @Get()
  findAll() {
    return this.chatService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.chatService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateChatDto) {
    return this.chatService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.chatService.remove(id);
  }
}

