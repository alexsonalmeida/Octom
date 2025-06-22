import { Controller, Post, Get, Delete, Param, Body, Query, UseInterceptors, UploadedFile, BadRequestException, NotFoundException, UsePipes, ValidationPipe } from '@nestjs/common';
import { FileService } from './file.service';
import { CreateFileDto } from './dto/create-file.dto';
import { SupabaseService } from 'src/services/supabase.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { FolderService } from 'src/folder/folder.service';
import { sanitizeFilename } from 'src/utils/sanitize-file-name';

@Controller('files')
export class FileController {
  constructor(
    private readonly supabase: SupabaseService,
    private readonly service: FileService,
    private readonly folderService: FolderService,
  ) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  async upload(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: any,
  ) {
    try {
      if (!file) {
        throw new BadRequestException('Nenhum arquivo foi enviado');
      }

      const dto: CreateFileDto = {
        name: file.originalname,
        type: file.mimetype,
        size: file.size,
        teamId: body.teamId,
        folderId: body.folderId || undefined,
        messageId: body.messageId || undefined,
        viewerIds: body.viewerIds ? 
          (typeof body.viewerIds === 'string' ? 
            JSON.parse(body.viewerIds) : 
            body.viewerIds
          ) : undefined,
      };

      const timestamp = Date.now();
      let basePath = 'uploads';
      
      if (dto.folderId) {
        const folder = await this.folderService.findById?.(dto.folderId);
        if (folder) {
          const folderSlug = folder.name.replace(/\s+/g, '-').toLowerCase();
          basePath = `${basePath}/${folderSlug}`;
        }
      }

      const sanitizedFilename = sanitizeFilename(file.originalname);
      const filePath = `${basePath}/${timestamp}-${sanitizedFilename}`;

      const { publicUrl } = await this.supabase.uploadFile(filePath, file);

      const saved = await this.service.create({
        ...dto,
        url: publicUrl,
      });

      return saved;
      
    } catch (error) {
      console.error('Erro no upload:', error);
      throw new BadRequestException(
        error.message || 'Erro interno no upload do arquivo'
      );
    }
  }

  @Get('team/:teamId')
  findByTeam(@Param('teamId') teamId: string) {
    return this.service.findByTeam(teamId);
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.service.findById(id);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.service.delete(id);
  }
}

