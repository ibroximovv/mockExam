import { BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/common/database/prisma/prisma.service';

export class BaseService<ModelDelegate, CreateDto = any, UpdateDto = any> {
  constructor(
    protected readonly prisma: PrismaService,
    protected readonly model: ModelDelegate,
  ) {}

  async create(data: CreateDto) {
    const created = await (this.model as any).create({ data });
    return {
      status_code: 201,
      message: 'success',
      data: created,
    };
  }

  async findMany(params: any = {}) {
    const data = await (this.model as any).findMany(params);
    return {
      status_code: 200,
      message: 'success',
      data,
    };
  }

  async findOne(where: any) {
    const data = await (this.model as any).findFirst({ where });
    return {
      status_code: 200,
      message: 'success',
      data,
    };
  }

  async update(where: any, data: UpdateDto) {
    const findone = await (this.model as any).findFirst({ where });
    if (!findone)
      throw new BadRequestException(
        `${this.constructor.name.replace('Service', '')} not found`,
      );
    const updated = await (this.model as any).update({ where, data });
    return {
      status_code: 200,
      message: 'success',
      data: updated,
    };
  }

  async delete(where: any) {
    const findone = await (this.model as any).findFirst({ where });
    if (!findone)
      throw new BadRequestException(
        `${this.constructor.name.replace('Service', '')} not found`,
      );
    const deleted = await (this.model as any).delete({ where });
    return {
      status_code: 200,
      message: 'deleted',
      data: deleted,
    };
  }
}