import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { SupabaseService } from 'src/services/supabase.service';
import { UserRepository } from './user.repository';

@Module({
  controllers: [UserController],
  providers: [UserService, SupabaseService, UserRepository],
})
export class UserModule {}
