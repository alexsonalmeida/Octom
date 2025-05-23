import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TaskCollaboratorService } from './task-collaborator.service';
import { CreateTaskCollaboratorDto } from './dto/create-task-collaborator.dto';
import { UpdateTaskCollaboratorDto } from './dto/update-task-collaborator.dto';

@Controller('task-collaborator')
export class TaskCollaboratorController {
  constructor(private readonly taskCollaboratorService: TaskCollaboratorService) {}

  @Post()
  create(@Body() createTaskCollaboratorDto: CreateTaskCollaboratorDto) {
    return this.taskCollaboratorService.create(createTaskCollaboratorDto);
  }

  @Get()
  findAll() {
    return this.taskCollaboratorService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.taskCollaboratorService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaskCollaboratorDto: UpdateTaskCollaboratorDto) {
    return this.taskCollaboratorService.update(+id, updateTaskCollaboratorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.taskCollaboratorService.remove(+id);
  }
}
