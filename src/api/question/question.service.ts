import { BadRequestException, Injectable } from '@nestjs/common';

import { BaseService } from 'src/infrastructure/lib/baseService';
import { PrismaClient } from '@prisma/client';
import { PrismaService } from 'src/common/database/prisma/prisma.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';

@Injectable()
export class QuestionService extends BaseService<PrismaClient['question'], CreateQuestionDto, UpdateQuestionDto> {
  constructor(prisma: PrismaService){
    super(prisma, prisma.question)
  }

  async create(createQuestionDto: CreateQuestionDto) {
    const questionLevel = await this.prisma.questionLevel.findFirst({ where: { id: createQuestionDto.questionLevelId }})
    if (!questionLevel) throw new BadRequestException('QuestionLevel not found')
    const findone = await this.prisma.question.findFirst({ where: {content : createQuestionDto.content }})
    if(findone) throw new BadRequestException('Question already exists')
    const data = await this.prisma.question.create({ data: createQuestionDto })
    return {
      status_code: 200,
      message: 'Successfull',
      data
    };
  }

  async findAll() {
    return await this.prisma.question.findMany();
  }

  async findOne(id: string) {  
    const data = await this.prisma.question.findFirst({ where: { id }})
    return {
      status_code: 200,
      message: 'Successfull',
      data
    };
  }

  async update(id: string, updateQuestionDto: UpdateQuestionDto) {
    if(updateQuestionDto.questionLevelId) {
      const questionLevel = await this.prisma.questionLevel.findFirst({ where: { id: updateQuestionDto.questionLevelId }})
      if (!questionLevel) throw new BadRequestException('QuestionLevel not found')
    }
    const findone = await this.prisma.question.findFirst({ where: { id }})
    if (findone) throw new BadRequestException('already exists')
    const data = await this.prisma.question.update({ where: { id }, data: updateQuestionDto })
    return {
      status_code: 200,
      message: 'Successfull updated',
      data
    };
  }

}
