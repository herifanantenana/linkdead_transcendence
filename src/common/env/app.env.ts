import { registerAs } from "@nestjs/config";
import Joi from "joi";

const appEnvValidator = Joi.object({
	NODE_ENV: Joi.string().valid("development", "production", "test").default("development").required(),
});

export default registerAs("app", () => ({
	nodeEnv: process.env.NODE_ENV || "development",
}));

export { appEnvValidator };
