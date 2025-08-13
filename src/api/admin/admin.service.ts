import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { BaseService } from 'src/infrastructure/lib/baseService';
import { PrismaClient } from '@prisma/client';
import { PrismaService } from 'src/common/database/prisma/prisma.service';
import { BcryptEncryption } from 'src/infrastructure/lib/bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AdminService extends BaseService<PrismaClient['admin'], CreateAdminDto, UpdateAdminDto> {
  constructor(readonly prisma: PrismaService, private jwtService: JwtService) {
    super(prisma, prisma.admin);
  }

  async create(createAdminDto: CreateAdminDto) {
    const findmany = await this.prisma.admin.findMany()
    if (findmany.length !== 0) throw new BadRequestException('Task testviy bolganligi uchun hozircha bitta admin yetadi')

    const hashedPassword = BcryptEncryption.encrypt(createAdminDto.password)

    const admin = await this.prisma.admin.create({
      data: {
        ...createAdminDto,
        password: hashedPassword
      }
    });

    return {
      status_code: 201,
      message: 'Admin created successfully',
      data: admin,
    };
  }

  async login(data: CreateAdminDto) {
    try {
      const findone = await this.prisma.admin.findFirst({ where: { name: data.name }})
      if(!findone) throw new BadRequestException('Admin not found')
      const matchPassword = BcryptEncryption.compare(data.password, findone.password)
      if(!matchPassword) throw new BadRequestException('Incorrect name or password!')
      const token = this.jwtService.sign({ id: findone.id })
      return { token }
    } catch (error) {
      if (error instanceof BadRequestException) throw error
      throw new InternalServerErrorException(error.message || 'Internal server error')
    }
  }
}
