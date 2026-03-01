import { Inject, Injectable } from "@nestjs/common";
import Redis from "ioredis";
import { REDIS_CLIENT } from "./ioredis.service";

@Injectable()
export class RedisService {
	constructor(@Inject(REDIS_CLIENT) private readonly redisClient: Redis) {}

	get client(): Redis {
		return this.redisClient;
	}
}
