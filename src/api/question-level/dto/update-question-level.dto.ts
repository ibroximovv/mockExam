
import { PartialType } from '@nestjs/swagger';
import { CreateQuestionLevelDto } from './create-question-level.dto';

export class UpdateQuestionLevelDto extends PartialType(CreateQuestionLevelDto) {}
