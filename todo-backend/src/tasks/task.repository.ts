import { Inject, Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Redis } from "ioredis";
import { IORedisKey } from "src/redis.module";

@Injectable()
export class TaskCustomRepository {
  private readonly ttl: string;
  private readonly logger = new Logger(TaskCustomRepository.name);

  constructor(
    configService: ConfigService,
    @Inject(IORedisKey) private readonly redisClient: Redis
  ) {
    this.ttl = "10000";
  }
}
