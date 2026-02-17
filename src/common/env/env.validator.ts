import { databaseEnvValidator } from "@apk_common/database/env/database.env";
import { appEnvValidator } from "@apk_common/env/app.env";
import Joi from "joi";

const envValidation: Joi.ObjectSchema = appEnvValidator.concat(databaseEnvValidator);

export default envValidation;
