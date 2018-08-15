import { Spool } from '@fabrix/fabrix/dist/common'
import { Validator } from './validator'
import { Analytics } from './analytics'

import * as config from './config/index'
import * as pkg from '../package.json'
import * as api from './api/index'

export class AnalyticsSpool extends Spool {

  constructor(app) {
    super(app, {
      config: config,
      pkg: pkg,
      api: api
    })
  }

  /**
   * Validates Configs
   */
  validate () {

    const requiredSpools = [
      'router', 'express', 'sequelize', 'engine'
    ]

    const spools = Object.keys(this.app.spools)

    if (!spools.some(v => requiredSpools.indexOf(v) >= 0)) {
      return Promise.reject(new Error(`spool-cart requires spools: ${ requiredSpools.join(', ') }!`))
    }

    if (!this.app.config.get('analytics')) {
      return Promise.reject(new Error('No configuration found at config.analytics!'))
    }

    return Promise.all([
      Validator.validateAnalyticsConfig(this.app.config.get('analytics'))
    ])

  }

  /**
   * Copy the configuration
   */
  async configure () {

    return Promise.all([
      Analytics.copyDefaults(this.app)
    ])
  }

  /**
   * TODO document method
   */
  async initialize () {

  }
}

