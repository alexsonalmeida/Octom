import { IsArray, IsInt, IsOptional, IsString } from 'class-validator';

export class CreateFileDto {
  @IsString()
  name: string;

  @IsString()
  type: string;

  @IsInt()
  size: number;

  @IsString()
  url: string;

  @IsString()
  teamId: string;

  @IsOptional()
  @IsString()
  folderId?: string;

  @IsOptional()
  @IsString()
  messageId?: string;
}
