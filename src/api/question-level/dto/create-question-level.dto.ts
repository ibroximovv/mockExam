import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class CreateQuestionLevelDto {
  @ApiProperty({ example: 'B2' })
  @IsString()
  level: string
}
