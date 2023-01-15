import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "./user.entity";
import * as bcrypt from "bcrypt";
import { sign, verify } from "jsonwebtoken";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<any>
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    try {
      const { email, password, first_name, last_name } = createUserDto;
      const saltOrRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltOrRounds);

      const user = new User();
      const date = Date.now();
      user.email = email;
      user.password = hashedPassword;
      user.first_name = first_name;
      user.last_name = last_name;
      user.user_id = first_name + date;
      const newUser = await this.userRepository.create(user);
      const result = await this.userRepository.save(newUser);
      console.log("result", result);
      const payload = { user_id: user.user_id };
      const access_token = await sign(payload, "mubasshir", {
        expiresIn: "6h",
      });
      console.log({ access_token });
      newUser.access_token = access_token;
      return newUser;
    } catch (err) {
      console.log({ err });

      if (err.name === "QueryFailedError") {
        // console.log(err.name);
        if (
          /^duplicate key value violates unique constraint/.test(err.message)
        ) {
          return {
            error_message: "Email Already Exists",
          };
        } else {
          console.log("Something went wrong");
        }
      }
    }
  }
}
