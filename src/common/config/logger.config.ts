import { registerAs } from "@nestjs/config";
import Joi from "joi";

export const loggerConfigValidator = Joi.object({
	LOGGER_LEVEL: Joi.string().valid("error", "warn", "info", "debug", "verbose").default("info"),
	LOGGER_DIR: Joi.string().default("./logs"),
	LOGGER_FILE_ACTIVE: Joi.boolean().default(false),
});

export default registerAs("logger", () => ({
	level: process.env.LOGGER_LEVEL || "info",
	dir: process.env.LOGGER_DIR || "./logs",
	fileActive: process.env.LOGGER_FILE_ACTIVE === "true",
}));
