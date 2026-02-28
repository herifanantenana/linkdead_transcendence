import { appConfigValidator } from "./app.config";
import { databaseConfigValidator } from "./database.config";

const ConfigValidator = appConfigValidator.concat(databaseConfigValidator);

export default ConfigValidator;
