import { registerAs } from "@nestjs/config";
import Joi from "joi";

export const mailerConfigValidator = Joi.object({
	MAILER_ENABLED: Joi.boolean().default(true),
	MAILER_FROM: Joi.string().required(),
	MAILER_TEMPLATE_DIR: Joi.string().default("src/common/infra/mailer/templates"),
	MAILER_USE_ETHEREAL: Joi.boolean().default(true),
	MAILER_HOST: Joi.string().default("smtp.gmail.com"),
	MAILER_DEV_PORT: Joi.number().default(587),
	MAILER_PROD_PORT: Joi.number().default(465),
	MAILER_USER: Joi.string().required(),
	MAILER_PASSWORD: Joi.string().required(),
});

export default registerAs("mailer", () => ({
	enable: process.env.MAILER_ENABLED === "true",
	from: process.env.MAILER_FROM || `no-reply@${process.env.MAILER_HOST || "example.com"}`,
	useEthereal: process.env.MAILER_USE_ETHEREAL === "true",
	host: process.env.MAILER_HOST,
	devPort: parseInt(process.env.MAILER_DEV_PORT || "587", 10),
	prodPort: parseInt(process.env.MAILER_PROD_PORT || "465", 10),
	user: process.env.MAILER_USER,
	password: process.env.MAILER_PASSWORD,
	templateDir: process.env.MAILER_TEMPLATE_DIR || "src/common/infra/mailer/templates",
}));
