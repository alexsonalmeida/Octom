import { IsArray, IsInt, IsOptional, IsString } from 'class-validator';
import { Transform, Type } from 'class-transformer';
export class CreateFileDto {
  @IsString()
  name: string;

  @IsString()
  type: string;

  @IsInt()
  size: number;

  @IsOptional()
  @IsString()
  url?: string;

  @IsString()
  teamId: string;

  @IsOptional()
  @IsString()
  folderId?: string;

  @IsOptional()
  @IsString()
  messageId?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      try {
        return JSON.parse(value);
      } catch {
        return [];
      }
    }
    if (Array.isArray(value)) {
      return value;
    }
    return [];
  })
  viewerIds?: string[];
}

