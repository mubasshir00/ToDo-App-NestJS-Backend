import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) private todoRepository: Repository<Task>,
  ) {}

  //find all
  getAllTasks() {
    return this.todoRepository.find();
  }

  async getTaskById(id: number) {
    console.log({ id });
    const todo = await this.todoRepository.findOneBy({ id: id });
    console.log({ todo });
    return todo;
  }
}
