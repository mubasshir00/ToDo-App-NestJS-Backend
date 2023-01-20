import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { redisModule } from "src/module.config";
import { Task } from "./task.entity";
import { TaskCustomRepository } from "./task.repository";
import { TasksController } from "./tasks.controller";
import { TasksService } from "./tasks.service";

@Module({
  imports: [TypeOrmModule.forFeature([Task]), ConfigModule, redisModule],
  controllers: [TasksController],
  providers: [TasksService, TaskCustomRepository],
})
export class TasksModule {}
