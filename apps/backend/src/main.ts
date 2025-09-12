import { NestFactory } from '@nestjs/core';
import { Module, Controller, Post, Body, Get } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { computeXP } from '@triathlon-rpg/utils';

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

@Module({
  controllers: [ActivityController],
})
class AppModule {}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(3001);
}
bootstrap();
