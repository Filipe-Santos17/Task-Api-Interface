import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { DbService } from 'src/db/db.service';

@Module({
  controllers: [TaskController],
  providers: [TaskService, DbService]
})
export class TaskModule {}
