import { Body, Controller, Get, Param, Post, Res } from "@nestjs/common";
import { UsersService } from "./users.service";
import { v4 as uuidv4 } from "uuid";
import { CreateUserDto } from "./dto/create-user.dto";
import { UserLoginDto } from "./dto/user-login.dto";

@Controller("users")
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get(":id")
  async getUser(@Param("id") user_id: string, @Res() res: any) {
    return res.status(200).json({
      status: true,
      status_message: "Success",
    });
  }

  @Post()
  async registerUser(@Body() createUserDto: CreateUserDto, @Res() res: any) {
    const result = await this.userService.createUser(createUserDto);
    console.log({ result });
    if (result) {
      console.log(result);
    }
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

  @Post("/login")
  async loginUser(@Body() userLoginDto: UserLoginDto, @Res() res: any) {
    const result = await this.userService.loginUser(userLoginDto);
    console.log({ result });
    if (result) {
      console.log(result);
    }
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
}
