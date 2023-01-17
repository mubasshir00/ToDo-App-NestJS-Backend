import { CacheModule, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { typeOrmConfig } from "./config/typeorm.config";
import { TasksModule } from "./tasks/tasks.module";
import { UsersModule } from "./users/users.module";
import * as redisStore from "cache-manager-redis-store";

@Module({
  imports: [
    TasksModule,
    TypeOrmModule.forRoot(typeOrmConfig),
    UsersModule,
    CacheModule.registerAsync({
      store: redisStore,
      host: "localhost", //default host
      port: 6379,
    }),
  ],
})
export class AppModule {}
