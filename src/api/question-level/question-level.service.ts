import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateQuestionLevelDto } from './dto/create-question-level.dto';
import { UpdateQuestionLevelDto } from './dto/update-question-level.dto';
import { BaseService } from 'src/infrastructure/lib/baseService';
import { PrismaClient } from '@prisma/client';
import { PrismaService } from 'src/common/database/prisma/prisma.service';

@Injectable()
export class QuestionLevelService extends BaseService<PrismaClient['questionLevel'], CreateQuestionLevelDto, UpdateQuestionLevelDto> {
  constructor(prisma: PrismaService){
    super(prisma, prisma.questionLevel)
  }

  async create(createQuestionLevelDto: CreateQuestionLevelDto) {
    const findone = await this.prisma.questionLevel.findFirst({ where: { level: createQuestionLevelDto.level }})
    if(findone) throw new BadRequestException('Level already exists')
    const data = await this.prisma.questionLevel.create({ data: createQuestionLevelDto })
    return {
      status_code: 200,
      message: 'Successfull',
      data
    };
  }

  async findAll() {
    return await this.prisma.questionLevel.findMany();
  }

  async findOne(id: string) {  
    const data = await this.prisma.questionLevel.findFirst({ where: { id }})
    return {
      status_code: 200,
      message: 'Successfull',
      data
    };
  }

  async update(id: string, updateQuestionLevelDto: UpdateQuestionLevelDto) {
    const findone = await this.prisma.questionLevel.findFirst({ where: { id }})
    if (findone) throw new BadRequestException('Level already exists')
    const data = await this.prisma.questionLevel.update({ where: { id }, data: updateQuestionLevelDto })
    return {
      status_code: 200,
      message: 'Successfull updated',
      data
    };
  }
}
