import RedisConfig from "@apk_common/config/redis.config";
import { Inject, Injectable, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { type ConfigType } from "@nestjs/config";
import Redis from "ioredis";
import { AppLogger } from "../logger/logger.service";

export const REDIS_CLIENT = Symbol("REDIS_CLIENT");

@Injectable()
export class IoredisService implements OnModuleInit, OnModuleDestroy {
	private readonly logger: AppLogger;
	private readonly client: Redis;

	constructor(
		private readonly appLogger: AppLogger,
		@Inject(RedisConfig.KEY) private readonly redisConfig: ConfigType<typeof RedisConfig>,
	) {
		this.logger = this.appLogger.withContext(IoredisService.name);

		const { host, port } = this.redisConfig;
		const redisUrl = `redis://${host}:${port}`;
		this.logger.log(`Initialized IoredisService with URL: ${redisUrl}`);

		this.client = new Redis(redisUrl, {
			keyPrefix: this.redisConfig.keyPrefix,
			maxRetriesPerRequest: 2,
			enableReadyCheck: true,
			lazyConnect: false,
		});

		this.client.on("error", (error) => {
			this.logger.error(`"Redis error: ${error.message}`, error.stack);
		});
		this.client.on("connect", () => {
			this.logger.log("Connected to Redis server");
		});
	}

	public getClient(): Redis {
		return this.client;
	}

	async onModuleInit() {
		await this.client.ping();
		this.logger.log("IoredisService module initialized");
	}

	async onModuleDestroy() {
		try {
			await this.client.quit();
			this.logger.log("Disconnected from Redis server");
		} catch {
			this.client.disconnect();
		}
	}
}
