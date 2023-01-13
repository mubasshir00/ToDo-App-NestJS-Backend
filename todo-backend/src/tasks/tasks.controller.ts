import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { Task } from './task.entity';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Get('/all')
  getTasks() {
    return this.taskService.getAllTasks();
  }

  @Get(':id')
  getTaskById(@Param('id') id: number) {
    // console.log(id);

    return this.taskService.getTaskById(id);
  }

  @Post()
  async createTask(@Body() task: CreateTaskDto) {
    return this.taskService.createTask(task);
  }

  @Put(':id')
  async updatePost(@Param('id') id: number, @Body() task: UpdateTaskDto) {
    console.log({id});
    console.log({task});
    
    
    return this.taskService.updateTask(id, task);
  }
}
