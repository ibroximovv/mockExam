import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateQuestionDto {
  @ApiProperty({
    description: 'Savol matni',
    example: 'Uchburchakning ichki burchaklar yig‘indisi nechiga teng?',
  })
  @IsString({ message: 'Content matn bo‘lishi kerak' })
  content: string;

  @ApiPropertyOptional({
    description: 'Savol darajasi ID (QuestionLevel jadvalidan)',
    example: 'b4a11cd8-38a9-41b6-94b0-ff7e1d123abc',
  })
  @IsOptional()
  @IsUUID('4', { message: 'questionLevelId UUID bo‘lishi kerak' })
  questionLevelId?: string;
}
