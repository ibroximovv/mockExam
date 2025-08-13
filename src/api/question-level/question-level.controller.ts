import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { QuestionLevelService } from './question-level.service';
import { CreateQuestionLevelDto } from './dto/create-question-level.dto';
import { UpdateQuestionLevelDto } from './dto/update-question-level.dto';
import { AuthGuard } from 'src/guard/auth.guard';

@Controller('question-level')
export class QuestionLevelController {
  constructor(private readonly questionLevelService: QuestionLevelService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createQuestionLevelDto: CreateQuestionLevelDto) {
    return this.questionLevelService.create(createQuestionLevelDto);
  }

  @Get()
  findAll() {
    return this.questionLevelService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.questionLevelService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateQuestionLevelDto: UpdateQuestionLevelDto) {
    return this.questionLevelService.update(id, updateQuestionLevelDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.questionLevelService.delete({ id });
  }
}
