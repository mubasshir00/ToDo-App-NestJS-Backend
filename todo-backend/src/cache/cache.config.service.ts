import {
  CacheModuleOptions,
  CacheOptionsFactory,
  Injectable,
} from "@nestjs/common";
import redisStore from "cache-manager-ioredis";

@Injectable()
export class CacheConfigService implements CacheOptionsFactory {
  public createCacheOptions(): CacheModuleOptions {
    const redisOptions: any = {
      host: "127.0.0.1",
      port: 6379,
    };
    return {
      store: redisStore,
      ttl: 5000,
      // https://github.com/dabroek/node-cache-manager-redis-store/blob/master/CHANGELOG.md#breaking-changes
      // Any value (undefined | null) return true (cacheable) after redisStore v2.0.0
      is_cacheable_value: () => true,
      ...redisOptions,
    };
  }
}
