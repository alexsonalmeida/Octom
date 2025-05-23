import { PartialType } from '@nestjs/swagger';
import { CreateTaskCollaboratorDto } from './create-task-collaborator.dto';

export class UpdateTaskCollaboratorDto extends PartialType(CreateTaskCollaboratorDto) {}
