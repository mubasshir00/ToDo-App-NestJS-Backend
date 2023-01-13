import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) private taskRepository: Repository<Task>,
  ) {}

  //find all
  getAllTasks() {
    return this.taskRepository.find();
  }

  async getTaskById(id: number) {
    console.log({ id });
    const todo = await this.taskRepository.findOneBy({ id: id });
    console.log({ todo });
    return todo;
  }

  async createTask(task: CreateTaskDto) {
    const newTask = await this.taskRepository.create(task);
    await this.taskRepository.save(newTask);

    return newTask;
  }

  async updateTask(id: number, task: UpdateTaskDto) {
    console.log({ id, task });
    
    const updateTask = await this.taskRepository.update(id, task);
    console.log({ updateTask });
  }
}
