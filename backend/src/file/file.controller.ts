import { Controller, Post, Get, Delete, Param, Body, Query, UseInterceptors, UploadedFile, BadRequestException } from '@nestjs/common';
import { FileService } from './file.service';
import { CreateFileDto } from './dto/create-file.dto';
import { SupabaseService } from 'src/services/supabase.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('files')
export class FileController {
  constructor(
    private readonly supabase: SupabaseService,
    private readonly service: FileService,
  ) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async upload(
    @UploadedFile() file: Express.Multer.File,
    @Body() dto: CreateFileDto,
  ) {
    const timestamp = Date.now();
    const path = `uploads/${timestamp}-${file.originalname}`;

    const { publicUrl } = await this.supabase.uploadFile(path, file);

    const saved = await this.service.create({
      ...dto,
      url: publicUrl,
      name: file.originalname,
      type: file.mimetype,
      size: file.size,
    });

    return saved;
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string, @Query('userId') userId: string) {
    return this.service.findById(id, userId);
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
