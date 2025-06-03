import { BadRequestException, Injectable } from '@nestjs/common';
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

  async create(createUserDto: CreateUserDto, file?: Express.Multer.File) {
    let profilePictureUrl: string | undefined;

    if (file) {
      const filePath = `profile-pictures/${Date.now()}-${file.originalname}`;
      const upload = await this.supabase.uploadFile(filePath, file);

      if ((upload as any)?.error) {
        throw new Error('Erro ao fazer upload da imagem');
      }

      profilePictureUrl = (upload as any).publicUrl;
    }

    return this.repository.create({
      ...createUserDto,
      profilePicture: profilePictureUrl,
      team: { connect: { id: createUserDto.teamId } },
    });
  }

  findAll() {
    return this.repository.findAll();
  }

  findOne(id: string) {
    return this.repository.findOne(id);
  }

  update(id: string, dto: UpdateUserDto) {
    return this.repository.update(id, dto);
  }

  remove(id: string) {
    return this.repository.remove(id);
  }
}

