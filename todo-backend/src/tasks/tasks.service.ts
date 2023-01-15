import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";
import { TaskStatus } from "./task-status.enum";
import { Task } from "./task.entity";

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) private taskRepository: Repository<Task>
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

  async createTask(createTaskDto: CreateTaskDto) {
    const { title, description } = createTaskDto;
    const task = new Task();
    task.title = title;
    task.description = description;
    task.status = TaskStatus.OPEN;
    // console.log({ task });
    const newTask = await this.taskRepository.create(task);
    await this.taskRepository.save(newTask);

    return newTask;
  }

  async updateTask(id: number, task: UpdateTaskDto) {
    console.log({ id, task });

    const getTask = await this.getTaskById(id);
    console.log({ getTask });
    if (!getTask) {
      return false;
    }
    const updateTask = await this.taskRepository.update(id, task);

    if (updateTask) {
      return updateTask;
    }
    throw new HttpException("Task Not Found", HttpStatus.NOT_FOUND);
  }

  async deleteTask(id: number) {
    const deleteTask = await this.taskRepository.delete(id);
    if (!deleteTask.affected) {
      throw new HttpException("Task not found", HttpStatus.NOT_FOUND);
    } else {
      return true;
    }
  }
}
