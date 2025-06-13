import { IsOptional, IsString, IsUUID } from "class-validator";
import { CreateSubtaskDto } from "src/subtask/dto/create-subtask.dto";

export class CreateTaskDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsString()
  status: string;

  @IsUUID('4', { each: true })
  tagIds: string[];

  @IsUUID()
  teamId: string;

  @IsOptional()
  @IsUUID('4', { each: true })
  collaboratorIds?: string[];

  @IsOptional()
  subtasks?: CreateSubtaskDto[];

  @IsOptional()
  createdAt?: string;

  @IsOptional()
  updatedAt?: string;
}
