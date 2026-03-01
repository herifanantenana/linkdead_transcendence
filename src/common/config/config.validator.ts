import { appConfigValidator } from "./app.config";
import { databaseConfigValidator } from "./database.config";
import { loggerConfigValidator } from "./logger.config";
import { mailerConfigValidator } from "./mailer.config";
import { redisConfigValidator } from "./redis.config";

const ConfigValidator = appConfigValidator
	.concat(databaseConfigValidator)
	.concat(loggerConfigValidator)
	.concat(redisConfigValidator)
	.concat(mailerConfigValidator);

export default ConfigValidator;
