import { IsOptional, IsString } from 'class-validator';

export class CreateChatDto {
  @IsString()
  type: string;

  @IsOptional()
  @IsString()
  teamId?: string;
}
