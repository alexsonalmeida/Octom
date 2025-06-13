import { IsHexColor, IsString } from 'class-validator';

export class CreateTagDto {
  @IsString()
  name: string;

  @IsHexColor()
  color: string;
}
