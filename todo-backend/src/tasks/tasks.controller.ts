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
  Res,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";
import { GetTasksFilterDto } from "./dto/get-tasks-filter.dto";
import { TaskStatusValidationPipe } from "./pipes/task-status-validation.pipe";
import { Task } from "./task.entity";
import { TasksService } from "./tasks.service";

@Controller("tasks")
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Get("/all")
  async getTasks(@Res() res: any) {
    const result = await this.taskService.getAllTasks();
    if (result) {
      return res.status(200).json({
        status: true,
        data: result,
      });
    } else {
      return res.status(400).json({
        status: false,
        status_message: "Something went wrong",
      });
    }
  }

  @Get(":id")
  async getTaskById(@Param("id") id: number, @Res() res: any) {
    // console.log(id);
    const result = await this.taskService.getTaskById(id);
    if (result) {
      return res.status(200).json({
        status: true,
        data: result,
      });
    } else {
      return res.status(400).json({
        status: false,
        status_message: "No Data Found",
      });
    }
  }

  @Post()
  async createTask(@Body() createTaskDto: CreateTaskDto, @Res() res: any) {
    const result = await this.taskService.createTask(createTaskDto);

    if (!result) {
      return res.status(400).json({
        status: false,
        status_message: "Something went wrong",
      });
    }

    if (result) {
      return res.status(200).json({
        status: true,
        status_message: "Success",
        data: result,
      });
    }
  }

  @Put(":id")
  async updatePost(
    @Param("id") id: number,
    @Body() task: UpdateTaskDto,
    @Res() res: any
  ) {
    const result = await this.taskService.updateTask(id, task);
    console.log({ result });
    if (result) {
      return res.status(200).json({
        status: true,
        status_message: "Updated",
      });
    } else {
      return res.status(400).json({
        status: false,
        status_message: "No Data Found",
      });
    }
  }

  @Delete(":id")
  async deletePost(@Param("id") id: number, @Res() res: any) {
    const result = await this.taskService.deleteTask(id);
    if (result) {
      return res.status(200).json({
        status: true,
        status_message: "Deleted",
      });
    }
  }
}
