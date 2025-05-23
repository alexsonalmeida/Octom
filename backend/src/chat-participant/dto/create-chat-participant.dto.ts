import { IsString } from 'class-validator';

export class CreateChatParticipantDto {
  @IsString()
  userId: string;

  @IsString()
  chatId: string;
}

