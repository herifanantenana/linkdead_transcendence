import { appConfigValidator } from "./app.config";
import { databaseConfigValidator } from "./database.config";
import { loggerConfigValidator } from "./logger.config";

const ConfigValidator = appConfigValidator.concat(databaseConfigValidator).concat(loggerConfigValidator);

export default ConfigValidator;
