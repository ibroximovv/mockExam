import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { PrismaService } from 'src/common/database/prisma/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { config } from 'src/config';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: config.ACCESS_TOKEN_KEY,
      signOptions: { expiresIn: config.ACCESS_TOKEN_TIME || '1d' },
    }),
  ],
  controllers: [AdminController],
  providers: [AdminService, PrismaService],
})
export class AdminModule { }
