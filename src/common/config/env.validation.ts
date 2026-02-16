import Joi from "joi";

export default Joi.object({
	NODE_END: Joi.string().valid("development", "production", "test").default("development").optional(),
	PORT: Joi.number().port().default(3000).optional(),
});
