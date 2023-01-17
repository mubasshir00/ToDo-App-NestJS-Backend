import { Global, Module, CacheModule as NestCacheModule } from "@nestjs/common";
import { CacheConfigService } from "./cache.config.service";
import { CacheService } from "./cache.service";

@Global()
@Module({
  imports: [
    NestCacheModule.registerAsync({
      useClass: CacheConfigService,
      inject: [CacheConfigService],
    }),
  ],
  providers: [CacheService, CacheConfigService],
  exports: [CacheService],
})
export class CacheModule {}
