import { Controller, Get } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Controller('users')
export class UserController {
  @Get()
  async getUsers() {
    const users = await prisma.user.findMany();
    return users;
  }
}
