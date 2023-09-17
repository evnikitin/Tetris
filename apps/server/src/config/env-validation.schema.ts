import * as Joi from 'joi';

export const envValidationSchema = Joi.object({
  NAME: Joi.string().required(),
  URL: Joi.string().required(),
  PORT: Joi.number().required(),
  DESCRIPTION: Joi.string().required(),
  API_DOCS_PATH: Joi.string().required(),
  VERSION: Joi.string().required(),

  POSTGRES_HOST: Joi.string().required(),
  POSTGRES_PORT: Joi.number().required(),
  POSTGRES_DB: Joi.string().required(),
  POSTGRES_PASSWORD: Joi.string().required(),
  POSTGRES_USER: Joi.string().required(),

  ACCESS_TOKEN_SECRET: Joi.string().required(),
  REFRESH_TOKEN_SECRET: Joi.string().required(),
  ACCESS_TOKEN_TTL: Joi.string().required(),
  REFRESH_TOKEN_TTL: Joi.string().required(),
  SALT_SIZE: Joi.number().required(),
});
