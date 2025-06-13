import { Controller, Post, Get, Patch, Delete, Param, Body } from '@nestjs/common';
import { TagService } from './tag.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { AssignTagToTaskDto } from './dto/assignt-task-to-tag.dto';

@Controller('tags')
export class TagController {
  constructor(private readonly service: TagService) {}

  @Post()
  create(@Body() createTagDto: CreateTagDto) {
    return this.service.create(createTagDto);
  }

  @Post('assign-to-task')
  assignToTask(@Body() dto: AssignTagToTaskDto) {
    return this.service.assignToTask(dto.tagId, dto.taskId);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateTagDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
