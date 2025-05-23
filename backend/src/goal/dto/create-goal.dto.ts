import { IsString } from 'class-validator';

export class CreateGoalDto {
  @IsString()
  title: string;

  @IsString()
  color: string;
}
