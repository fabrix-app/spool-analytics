import { FabrixService as Service } from '@fabrix/fabrix/dist/common'
import { ModelError } from '@fabrix/spool-sequelize/dist/errors'
import * as moment from 'moment'
import { isNumber } from 'lodash'

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

  findCompare(params) {
    const Analytics = this.app.models['Analytic']
    const name = params.name

    return Analytics.findAll({
      where: {
        name: name
      },
      limit: 2,
      order: [['created_at', 'DESC']]
    })
      .then(analytics => {
        if (analytics.length === 0 ) {
          throw new ModelError('E_NOT_FOUND', `${name} not found`)
        }

        // Make the analytics always a group of two
        if (analytics.length === 1) {
          analytics = [...analytics, ...analytics]
        }

        if (!analytics[0].group_label) {
          const trend = this.trendGroup(analytics[0].data, analytics[1].data)
          Object.assign(analytics[0], {
            trend: trend,
            trend_range: 2,
            trend_date_range: [analytics[0].end, analytics[1].start],
          })
        }
        else {
          const trend = analytics[0].data.map((d, i) => {
            return this.trendGroup(analytics[0].data[i], analytics[1].data[i])
          })
          Object.assign(analytics[0], {
            trend: trend,
            trend_range: 2,
            trend_date_range: [analytics[0].end, analytics[1].start],
          })
        }
        return analytics[0]
      })
  }

  trendGroup(group1 = [], group2 = []) {
    const trend = []
    group1.forEach((d, i) => {
      if (isNumber(d)) {
        trend.push(d - (group2[i] || 0))
      }
      else {
        trend.push(d)
      }
    })
    return trend
  }

  findGroup(params, query) {
    const Analytics = this.app.models['Analytic']
    const start = moment(query.start)
    const end = moment(query.end || Date.now())
    const name = params.name

    return Analytics.findAll({
      where: {
        name: name,
        start: {
          $gte: start.format('YYYY-MM-DD HH:mm:ss')
        },
        end: {
          $gte: end.format('YYYY-MM-DD HH:mm:ss')
        }
      }
    })
  }

}

