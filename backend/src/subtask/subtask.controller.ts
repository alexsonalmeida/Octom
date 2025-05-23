import { Controller, Post, Get, Patch, Delete, Param, Body } from '@nestjs/common';
import { SubtaskService } from './subtask.service';
import { CreateSubtaskDto } from './dto/create-subtask.dto';
import { UpdateSubtaskDto } from './dto/update-subtask.dto';

@Controller('subtasks')
export class SubtaskController {
  constructor(private readonly service: SubtaskService) {}

  @Post()
  create(@Body() dto: CreateSubtaskDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Get('task/:taskId')
  findByTask(@Param('taskId') taskId: string) {
    return this.service.findByTaskId(taskId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateSubtaskDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
