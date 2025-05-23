import { IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateSubtaskDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsString()
  status: string;

  @IsUUID()
  taskId: string;
}
