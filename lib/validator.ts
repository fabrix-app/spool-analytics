import * as joi from 'joi'
import { analyticsConfig } from './schemas/analyticsConfig'

export const Validator = {
  validateAnalyticsConfig (config) {
    return new Promise((resolve, reject) => {
      joi.validate(config, analyticsConfig, (err, value) => {
        if (err) {
          return reject(new TypeError('config.analytics: ' + err))
        }
        return resolve(value)
      })
    })
  }
}
