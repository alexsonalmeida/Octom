import { IsString, IsUUID } from "class-validator";

export class AssignTagToTaskDto {
  @IsString()
  tagId: string;

  @IsString()
  taskId: string;
}
