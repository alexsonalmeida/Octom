import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
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

  @Delete()
  remove(@Query('userId') userId: string, @Query('taskId') taskId: string) {
    return this.taskCollaboratorService.remove(userId, taskId);
  }

  @Get('by-task/:taskId')
  findCollaboratorsByTask(@Param('taskId') taskId: string) {
    return this.taskCollaboratorService.findCollaboratorsByTask(taskId);
  }

  @Get('by-user/:userId')
  findTasksByUser(@Param('userId') userId: string) {
    return this.taskCollaboratorService.findTasksByUser(userId);
  }
}