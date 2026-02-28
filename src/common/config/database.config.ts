import { registerAs } from "@nestjs/config";
import Joi from "joi";

export const databaseConfigValidator = Joi.object({
	DATABASE_USER: Joi.string().required(),
	DATABASE_PASSWORD: Joi.string().required(),
	DATABASE_HOST: Joi.string().required(),
	DATABASE_PORT: Joi.number().port().default(5432),
	DATABASE_NAME: Joi.string().required(),
});

export default registerAs("database", () => ({
	user: process.env.DATABASE_USER,
	password: process.env.DATABASE_PASSWORD,
	host: process.env.DATABASE_HOST,
	port: parseInt(process.env.DATABASE_PORT ?? "5432", 10),
	name: process.env.DATABASE_NAME,
}));
