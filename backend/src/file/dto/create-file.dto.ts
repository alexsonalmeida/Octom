import { IsInt, IsOptional, IsString } from 'class-validator';

export class CreateFileDto {
  @IsString()
  name: string;

  @IsString()
  type: string;

  @IsInt()
  size: number;

  @IsString()
  url: string;

  @IsOptional()
  @IsString()
  messageId?: string;
}

