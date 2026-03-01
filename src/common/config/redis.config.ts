import { registerAs } from "@nestjs/config";
import Joi from "joi";

export const redisConfigValidator = Joi.object({
	REDIS_HOST: Joi.string().hostname().required(),
	REDIS_PORT: Joi.number().default(6379),
	REDIS_KEY_PREFIX: Joi.string().required(),
	REDIS_PENDING_REGISTER_TTL_SECONDS: Joi.number().default(300),
});

export default registerAs("redis", () => ({
	host: process.env.REDIS_HOST || "localhost",
	port: parseInt(process.env.REDIS_PORT || "6379", 10),
	keyPrefix: process.env.REDIS_KEY_PREFIX || "linkdead_v3:",
	pendingRegisterTtlSeconds: parseInt(process.env.REDIS_PENDING_REGISTER_TTL_SECONDS || "300", 10),
}));
