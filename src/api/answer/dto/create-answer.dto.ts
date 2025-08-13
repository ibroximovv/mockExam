import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString, IsUUID, Length } from 'class-validator';
import { Option } from '@prisma/client';

export class CreateAnswerDto {
  @ApiProperty({
    description: 'Javob varianti A',
    example: '3',
  })
  @IsString({ message: 'optionA matn bo‘lishi kerak' })
  @Length(1, 255)
  optionA: string;

  @ApiProperty({
    description: 'Javob varianti B',
    example: '4',
  })
  @IsString()
  @Length(1, 255)
  optionB: string;

  @ApiProperty({
    description: 'Javob varianti C',
    example: '5',
  })
  @IsString()
  @Length(1, 255)
  optionC: string;

  @ApiProperty({
    description: 'Javob varianti D',
    example: '6',
  })
  @IsString()
  @Length(1, 255)
  optionD: string;

  @ApiProperty({
    description: 'To‘g‘ri javob varianti',
    enum: Option,
    example: Option.B,
  })
  @IsEnum(Option, { message: 'correctOption faqat A, B, C yoki D bo‘lishi kerak' })
  correctOption: Option;

  @ApiProperty({
    description: 'Savol ID (Question jadvalidan)',
    example: 'f94a4821-b4cb-4db8-bbe4-293fb3dbff9b',
  })
  @IsUUID('4', { message: 'questionId UUID bo‘lishi kerak' })
  questionId: string;
}
