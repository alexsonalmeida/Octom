import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @Body() createUserDto: CreateUserDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    try {
      return await this.userService.create(createUserDto, file);
    } catch (error) {
      console.error('Erro no controller:', error);
      throw error;
    }
  }

  @Get()
  async findAll() {
    try {
      return await this.userService.findAll();
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
      throw error;
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.userService.findOne(id);
    } catch (error) {
      console.error('Erro ao buscar usuário:', error);
      throw error;
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    try {
      return await this.userService.update(id, updateUserDto);
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error);
      throw error;
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return await this.userService.remove(id);
    } catch (error) {
      console.error('Erro ao remover usuário:', error);
      throw error;
    }
  }
}