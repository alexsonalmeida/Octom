import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FolderService } from './folder.service';
import { CreateFolderDto } from './dto/create-folder.dto';
import { UpdateFolderDto } from './dto/update-folder.dto';

@Controller('folders')
export class FolderController {
  constructor(private readonly service: FolderService) {}

  @Post()
  create(@Body() dto: CreateFolderDto) {
    return this.service.create(dto);
  }

  @Get('team/:teamId')
  findByTeam(@Param('teamId') teamId: string) {
    return this.service.findByTeam(teamId);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.service.delete(id);
  }
}


