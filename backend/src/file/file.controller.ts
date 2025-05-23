import { Controller, Post, Get, Delete, Param, Body } from '@nestjs/common';
import { FileService } from './file.service';
import { CreateFileDto } from './dto/create-file.dto';

@Controller('files')
export class FileController {
  constructor(private readonly service: FileService) {}

  @Post()
  create(@Body() dto: CreateFileDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.service.findById(id);
  }

  @Get('viewer/:userId')
  findByViewer(@Param('userId') userId: string) {
    return this.service.findByViewer(userId);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.service.delete(id);
  }
}
