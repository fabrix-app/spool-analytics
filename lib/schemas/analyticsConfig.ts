import * as joi from 'joi'

export const analyticsConfig = joi.object().keys({
  prefix: joi.string().allow('', null),
  profile: joi.string().allow(null).required(),
  config: joi.object().keys({
    auto_run: joi.boolean(),
    profiles: joi.object().pattern(/^/, joi.array().items(joi.string().regex(/(.+)\.(.+)/))),
    frequency: joi.object().pattern(/^/, joi.array().items(joi.string().regex(/(.+)\.(.+)/)))
  })
}).unknown()
