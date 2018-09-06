import { Spool } from '@fabrix/fabrix/dist/common'
import { Validator } from './validator'
import { Utils } from './utils'

import * as config from './config/index'
import * as pkg from '../package.json'
import * as api from './api/index'

export class AnalyticsSpool extends Spool {
  public analytics = {
    minute: new Set(),
    hour: new Set(),
    day: new Set(),
    week: new Set(),
    month: new Set(),
    quarter: new Set(),
    year: new Set(),
  }

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
      'router', 'express', 'sequelize', 'crons'
    ]

    const spools = Object.keys(this.app.spools)

    if (!spools.some(v => requiredSpools.indexOf(v) >= 0)) {
      return Promise.reject(new Error(`spool-cart requires spools: ${ requiredSpools.join(', ') }!`))
    }

    if (!this.app.config.get('analytics')) {
      return Promise.reject(new Error('No configuration found at config.analytics!'))
    }

    if (!this.app.crons['AnalyticsCron']) {
      return Promise.reject(new Error('AnalyticsCron is not available!'))
    }

    return Promise.all([
      Validator.validateAnalyticsConfig(this.app.config.get('analytics'))
    ])
      .catch(err => {
        return Promise.reject(err)
      })

  }

  /**
   * Copy the configuration
   */
  async configure () {

    return Promise.all([
      Utils.copyDefaults(this.app),
      Utils.loadAnalytics(this.app)
    ])
      .catch(err => {
        return Promise.reject(err)
      })
  }

  /**
   * TODO document method
   */
  async initialize () {
    Utils.addAnalyticsToCron(this.app)
    return Promise.resolve()
  }
}

