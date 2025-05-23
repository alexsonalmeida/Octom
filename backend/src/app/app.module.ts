import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from 'src/utils/prisma/prisma.module';
import { TaskModule } from 'src/task/task.module';
import { UserModule } from 'src/user/user.module';
import { TeamModule } from 'src/team/team.module';
import { TaskCollaboratorModule } from 'src/task-collaborator/task-collaborator.module';
import { TagModule } from 'src/tag/tag.module';
import { SubtaskModule } from 'src/subtask/subtask.module';
import { GoalModule } from 'src/goal/goal.module';
import { ChatModule } from 'src/chat/chat.module';
import { ChatParticipantModule } from 'src/chat-participant/chat-participant.module';
import { MessageModule } from 'src/message/message.module';

@Module({
  imports: [
    PrismaModule, 
    TaskModule, 
    UserModule, 
    TeamModule, 
    TaskCollaboratorModule, 
    TagModule, 
    SubtaskModule, 
    GoalModule,
    ChatModule,
    ChatParticipantModule,
    MessageModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
