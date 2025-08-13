import { BadRequestException, Injectable } from '@nestjs/common';

import { BaseService } from 'src/infrastructure/lib/baseService';
import { PrismaClient } from '@prisma/client';
import { PrismaService } from 'src/common/database/prisma/prisma.service';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';


@Injectable()
export class AnswerService extends BaseService<PrismaClient['answer'], CreateAnswerDto, UpdateAnswerDto> {
  constructor(prisma: PrismaService) {
    super(prisma, prisma.answer)
  }

  async create(createAnswerDto: CreateAnswerDto) {

    const question = await this.prisma.question.findFirst({ where: { id: createAnswerDto.questionId } })
    if (!question) throw new BadRequestException('Question not found')

    const findone = await this.prisma.answer.findFirst({
      where: {
        AND: [
          { optionA: createAnswerDto.optionA },
          { optionB: createAnswerDto.optionB },
          { optionC: createAnswerDto.optionC },
          { optionD: createAnswerDto.optionD },
          { correctOption: createAnswerDto.correctOption },
        ]
      }
    })
    if (findone) throw new BadRequestException('answer already exists')

    const data = await this.prisma.answer.create({ data: createAnswerDto })
    return {
      status_code: 200,
      message: 'Successfull',
      data
    };
  }

  async findAll() {
    return await this.prisma.answer.findMany();
  }

  async findOne(id: string) {
    const data = await this.prisma.answer.findFirst({ where: { id } })
    return {
      status_code: 200,
      message: 'Successfull',
      data
    };
  }

  async update(id: string, updateAnswerDto: UpdateAnswerDto) {
    if (updateAnswerDto.questionId) {
      const question = await this.prisma.question.findFirst({ where: { id: updateAnswerDto.questionId } })
      if (!question) throw new BadRequestException('Question not found')
    }
    const findone = await this.prisma.answer.findFirst({ where: { id } })
    if (findone) throw new BadRequestException('already exists')
    const data = await this.prisma.answer.update({ where: { id }, data: updateAnswerDto })
    return {
      status_code: 200,
      message: 'Successfull updated',
      data
    };
  }
}
