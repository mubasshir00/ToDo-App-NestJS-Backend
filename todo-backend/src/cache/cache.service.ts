import { CACHE_MANAGER, Inject, Injectable, Logger } from "@nestjs/common";
import { Cache } from "cache-manager";
import { Redis } from "ioredis";

@Injectable()
export class CacheService {
  private cache!: Cache;
  private logger = new Logger(CacheService.name);
  constructor(@Inject(CACHE_MANAGER) cache: Cache) {
    this.cache = cache;
    this.redisClient.on("ready", () => {
      this.logger.log("Redis is ready");
    });
  }
  private get redisClient(): Redis {
    return ;
  }
  public getClient() {
    return this.redisClient;
  }
}
