import { registerAs } from "@nestjs/config";
import Joi from "joi";

export const appConfig = Joi.object({
	NODE_ENV: Joi.string().valid("development", "production", "test").default("development"),
	APP_PORT: Joi.number().default(5000),
	TRUST_PROXY: Joi.boolean().default(false),
	CLIENT_URL: Joi.string().uri().default("http://localhost:3000"),
});

export default registerAs("app", () => ({
	NODE_ENV: process.env.NODE_ENV,
	APP_PORT: parseInt(process.env.APP_PORT ?? "5000", 10),
	TRUST_PROXY: process.env.TRUST_PROXY === "true",
	CLIENT_URL: process.env.CLIENT_URL,
}));
