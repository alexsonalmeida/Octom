import { IsUUID } from 'class-validator';

export class CreateTaskCollaboratorDto {
  @IsUUID()
  userId: string;

  @IsUUID()
  taskId: string;
}
