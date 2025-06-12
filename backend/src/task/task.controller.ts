import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseUUIDPipe,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { GetTaskStatsDto } from './dto/get-task.dto';

@ApiTags('tasks')
@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.taskService.create(createTaskDto);
  }

  @Get(':id/dashboard')
  getDashboard(@Param('id') userId: string) {
    return this.taskService.getDashboard(userId);
  }

  @Get(':id/completed-stats')
  getCompletedTasksStats(
    @Param('id') userId: string,
    @Query() query: GetTaskStatsDto
  ) {
    const from = new Date(query.from);
    const to = new Date(query.to);
    const resolution = query.resolution;

    return this.taskService.getCompletedTasksStats(userId, from, to, resolution);
  }

  @Get()
  findAll() {
    return this.taskService.findAll();
  }

  @Get('user/:userId')
  getTasksByUser(
    @Param('userId') userId: string,
    @Query('status') status?: 'open' | 'in_progress' | 'done',
  ) {
    return this.taskService.getTasksByUser(userId, status);
  }

  @Get('team/:teamId')
  findByTeam(@Param('teamId') teamId: string, @Query('status') status?: string) {
    return this.taskService.getTasksByTeam(teamId, status);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.taskService.findById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.taskService.update(id, updateTaskDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.taskService.delete(id);
  }
}