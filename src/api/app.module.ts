import { Module } from '@nestjs/common';
import { AdminModule } from './admin/admin.module';
import { QuestionLevelModule } from './question-level/question-level.module';
import { QuestionModule } from './question/question.module';
import { AnswerModule } from './answer/answer.module';

@Module({
  imports: [AdminModule, QuestionLevelModule, QuestionModule, AnswerModule],
  controllers: [],
  providers: [],
})
export class AppModule {}