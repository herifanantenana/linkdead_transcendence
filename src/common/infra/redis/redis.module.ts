import { Global, Module } from "@nestjs/common";
import { IoredisService, REDIS_CLIENT } from "./ioredis.service";
import { RedisService } from "./redis.service";

@Global()
@Module({
	providers: [
		IoredisService,
		{
			provide: REDIS_CLIENT,
			useFactory: (ioredisService: IoredisService) => ioredisService.getClient(),
			inject: [IoredisService],
		},
		RedisService,
	],
	exports: [RedisService],
})
export class RedisModule {}
