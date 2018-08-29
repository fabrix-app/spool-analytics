import { FabrixService as Service } from '@fabrix/fabrix/dist/common'

/**
 * @module AnalyticsService
 * @description Proxy Analytics Service
 */
export class AnalyticsService extends Service {
  build() {
    const analytics = []

    for (const analytic in this.app.analytics) {
      // skip loop if the property is from prototype
      if (!this.app.analytics.hasOwnProperty(analytic)) {
        continue
      }
      if (!this.app.analytics[analytic].hasOwnProperty('build')) {
        continue
      }
      analytics.push(this.app.analytics[analytic])
    }
    return Promise.all(analytics.map(analytic => {
      return analytic.build()
    }))
      .then(results => {
        this.app.log.info(results)
        return
      })
  }

  findOne(params) {

  }

  findGroup(params) {

  }

}

