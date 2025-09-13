import { NestFactory } from '@nestjs/core';
import { Module, Controller, Post, Body, Get } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { computeXP } from './utils';

const prisma = new PrismaClient();

@Controller('activities')
class ActivityController {
  @Post()
  async createActivity(@Body() body: { duration: number; sport: string }) {
    const xp = computeXP(body);
    const activity = await prisma.activity.create({
      data: { duration: body.duration, sport: body.sport, xp }
    });
    return { activity, xp };
  }
  @Get()
  async getActivities() {
    const activities = await prisma.activity.findMany();
    return activities;
  }
}

@Controller('tests')
class TestController {
  @Get()
  async getTests() {
    const tests = await prisma.test.findMany();
    return tests;
  }
}

@Module({
  controllers: [ActivityController, TestController],
})
class AppModule {}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(process.env.PORT || 3001, "0.0.0.0");
}
bootstrap();
