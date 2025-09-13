import { Module } from '@nestjs/common';
import { ActivityController } from './controllers/activity.controller';
import { UserController } from './controllers/user.controller';

@Module({
  controllers: [ActivityController, UserController],
})
export class AppModule {}
