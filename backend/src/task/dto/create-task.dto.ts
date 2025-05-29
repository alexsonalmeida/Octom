import {
  IsString,
  IsOptional,
  IsArray,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { CreateSubtaskDto } from '../../subtask/dto/create-subtask.dto';

export class CreateTaskDto {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty()
  @IsString()
  status: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsUUID()
  goalId?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsUUID()
  tagId?: string;

  @ApiProperty({ type: [String], required: false })
  @IsOptional()
  @IsArray()
  @IsUUID('4', { each: true })
  collaboratorIds?: string[];

  @ApiProperty({ type: [CreateSubtaskDto], required: false })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateSubtaskDto)
  subtasks?: CreateSubtaskDto[];
}

