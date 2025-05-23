import { IsString, IsUUID } from 'class-validator';

export class CreateTagDto {
  @IsString()
  name: string;

  @IsString()
  color: string;

  @IsUUID()
  taskId: string;
}
