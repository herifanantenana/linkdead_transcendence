import { registerAs } from "@nestjs/config";
import Joi from "joi";

export const appConfigValidator = Joi.object({
	NODE_ENV: Joi.string().valid("development", "production", "test").default("development"),
	APP_PORT: Joi.number().default(5000),
	TRUST_PROXY: Joi.boolean().default(false),
	CLIENT_URL: Joi.string().uri().default("http://localhost:3000"),
});

const AppConfig = registerAs("app", () => ({
	nodeEnv: process.env.NODE_ENV,
	port: parseInt(process.env.APP_PORT ?? "5000", 10),
	trustProxy: process.env.TRUST_PROXY === "true",
	clientUrl: process.env.CLIENT_URL,
}));

export default AppConfig;
