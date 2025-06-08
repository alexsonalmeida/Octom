import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './user.repository';
import { SupabaseService } from 'src/services/supabase.service';

@Injectable()
export class UserService {
  constructor(
    private readonly repository: UserRepository,
    private readonly supabase: SupabaseService,
  ) {}

  // async create(createUserDto: CreateUserDto, file?: Express.Multer.File) {
  //   try {
  //     let profilePictureUrl: string | undefined;

  //     if (file) {
  //       // Validações básicas do arquivo
  //       if (!file.buffer || file.buffer.length === 0) {
  //         throw new BadRequestException('Arquivo está vazio ou corrompido');
  //       }

  //       const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
  //       if (!allowedTypes.includes(file.mimetype)) {
  //         throw new BadRequestException('Tipo de arquivo não permitido. Use apenas imagens (JPEG, PNG, GIF, WebP)');
  //       }

  //       const maxSize = 5 * 1024 * 1024; // 5MB
  //       if (file.size > maxSize) {
  //         throw new BadRequestException('Arquivo muito grande. Tamanho máximo: 5MB');
  //       }

  //       const filePath = `profile-pictures/${Date.now()}-${file.originalname}`;
  //       const upload = await this.supabase.uploadFile(filePath, file);
  //       profilePictureUrl = upload.publicUrl;
  //     }

  //     // Validação do createUserDto
  //     if (!createUserDto) {
  //       throw new BadRequestException('Dados do usuário são obrigatórios');
  //     }

  //     return await this.repository.create({
  //       ...createUserDto,
  //       profilePicture: profilePictureUrl,
  //       team: createUserDto.teamId ? { connect: { id: createUserDto.teamId } } : undefined,
  //     });
  //   } catch (error) {
  //     console.error('Erro no UserService.create:', error);
      
  //     // Re-throw known exceptions
  //     if (error instanceof BadRequestException || error instanceof InternalServerErrorException) {
  //       throw error;
  //     }
      
  //     // Handle unknown errors
  //     throw new InternalServerErrorException('Erro interno do servidor ao criar usuário');
  //   }
  // }
  async create(createUserDto: CreateUserDto, file?: Express.Multer.File) {
    try {
      let profilePictureUrl: string | undefined;

      if (file) {
        if (!file.buffer || file.buffer.length === 0) {
          throw new BadRequestException('Arquivo está vazio ou corrompido');
        }

        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
        if (!allowedTypes.includes(file.mimetype)) {
          throw new BadRequestException('Tipo de arquivo não permitido. Use apenas imagens (JPEG, PNG, GIF, WebP)');
        }

        const maxSize = 5 * 1024 * 1024; // 5MB
        if (file.size > maxSize) {
          throw new BadRequestException('Arquivo muito grande. Tamanho máximo: 5MB');
        }

        const filePath = `profile-pictures/${Date.now()}-${file.originalname}`;
        const upload = await this.supabase.uploadFile(filePath, file);
        profilePictureUrl = upload.publicUrl;
      }

      if (!createUserDto) {
        throw new BadRequestException('Dados do usuário são obrigatórios');
      }

      if (!createUserDto.teamId) {
        throw new BadRequestException('teamId é obrigatório');
      }

      const { teamId, ...userData } = createUserDto;
      
      return await this.repository.create({
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        role: userData.role,
        profilePicture: profilePictureUrl,
        team: {
          connect: {
            id: teamId
          }
        }
      });
    } catch (error) {
      console.error('Erro no UserService.create:', error);
      
      if (error instanceof BadRequestException || error instanceof InternalServerErrorException) {
        throw error;
      }
      
      throw new InternalServerErrorException('Erro interno do servidor ao criar usuário');
    }
  }

  async findAll() {
    try {
      return await this.repository.findAll();
    } catch (error) {
      console.error('Erro no UserService.findAll:', error);
      throw new InternalServerErrorException('Erro ao buscar usuários');
    }
  }

  async findOne(id: string) {
    try {
      if (!id) {
        throw new BadRequestException('ID é obrigatório');
      }
      return await this.repository.findOne(id);
    } catch (error) {
      console.error('Erro no UserService.findOne:', error);
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException('Erro ao buscar usuário');
    }
  }

  async update(id: string, dto: UpdateUserDto) {
    try {
      if (!id) {
        throw new BadRequestException('ID é obrigatório');
      }
      return await this.repository.update(id, dto);
    } catch (error) {
      console.error('Erro no UserService.update:', error);
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException('Erro ao atualizar usuário');
    }
  }

  async remove(id: string) {
    try {
      if (!id) {
        throw new BadRequestException('ID é obrigatório');
      }
      return await this.repository.remove(id);
    } catch (error) {
      console.error('Erro no UserService.remove:', error);
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException('Erro ao remover usuário');
    }
  }
}
