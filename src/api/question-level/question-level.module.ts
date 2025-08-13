import { Module } from '@nestjs/common';
import { QuestionLevelService } from './question-level.service';
import { QuestionLevelController } from './question-level.controller';
import { PrismaService } from 'src/common/database/prisma/prisma.service';

@Module({
  controllers: [QuestionLevelController],
  providers: [QuestionLevelService, PrismaService],
})
export class QuestionLevelModule {}
