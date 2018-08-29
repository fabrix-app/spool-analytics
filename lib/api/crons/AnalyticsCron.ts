import { Cron } from '@fabrix/spool-engine'
import { FabrixApp } from '@fabrix/fabrix'

export class AnalyticsCron extends Cron {
  private _analytics = {
    year: new Map(),
    quarter: new Map(),
    month: new Map(),
    week: new Map(),
    day: new Map(),
    hour: new Map(),
    minute: new Map()
  }

  constructor(app: FabrixApp) {
    super(app)

    super.unallowedMethods = [
      'addAnalytic',
      'removeAnalytic'
    ]

    Object.defineProperties(this, {
      /**
       * Add Analytic
       */
      addAnalytic: {
        enumerable: false,
        value: (time, analyticName, analytic) => {
          if (this._analytics[time]) {
            return this._analytics[time].set(analyticName, analytic)
          }
          return null
        },
        writable: true
      },
      /**
       * Remove Analytic
       */
      removeAnalytic: {
        enumerable: false,
        value: (time, analytic) => {
          if (this._analytics[time]) {
            return this._analytics[time].delete(analytic.name, analytic)
          }
          return null
        },
        writable: true
      }
    })
  }

  minute() {
    // Every minute build the analytic
    const rule = new this.scheduler.RecurrenceRule()
    rule.second = 0

    // Schedule the recurring job
    this.scheduler.scheduleJob('AnalyticsCron.minute', rule, () => {
      this._analytics.minute.forEach((analytic, name) => {
        this.app.log.debug('Run Analytic:', name)
        try {
          analytic()
        }
        catch (err) {
          this.app.log.error(err)
        }
      })
    })
  }

  hour() {
    // Every Hour build the analytic
    const rule = new this.scheduler.RecurrenceRule()
    rule.minute = 0
    // rule.hour = 0

    // Schedule the recurring job
    this.scheduler.scheduleJob('AnalyticsCron.hour', rule, () => {
      this._analytics.hour.forEach((analytic, name) => {
        this.app.log.debug('Run Analytic:', name)
        try {
          analytic()
        }
        catch (err) {
          this.app.log.error(err)
        }
      })
    })
  }

  day() {
    // Every Day at midnight build the analytic
    const rule = new this.scheduler.RecurrenceRule()
    rule.minute = 0
    rule.hour = 0

    // Schedule the recurring job
    this.scheduler.scheduleJob('AnalyticsCron.day', rule, () => {
      this._analytics.day.forEach((analytic, name) => {
        this.app.log.debug('Run Analytic:', name)
        try {
          analytic()
        }
        catch (err) {
          this.app.log.error(err)
        }
      })
    })
  }

  week() {
    // Every Week at midnight build the analytic
    const rule = new this.scheduler.RecurrenceRule()
    rule.minute = 0
    rule.hour = 0
    rule.dayOfWeek = 0

    // Schedule the recurring job
    this.scheduler.scheduleJob('AnalyticsCron.week', rule, () => {
      this._analytics.week.forEach((analytic, name) => {
        this.app.log.debug('Run Analytic:', name)
        try {
          analytic()
        }
        catch (err) {
          this.app.log.error(err)
        }
      })
    })
  }

  month() {
    // Every Month at midnight build the analytic
    const rule = new this.scheduler.RecurrenceRule()
    rule.minute = 0
    rule.hour = 0
    rule.date = 1
    rule.month = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
    // Schedule the recurring job
    this.scheduler.scheduleJob('AnalyticsCron.month', rule, () => {
      this._analytics.month.forEach((analytic, name) => {
        this.app.log.debug('Run Analytic:', name)
        try {
          analytic()
        }
        catch (err) {
          this.app.log.error(err)
        }
      })
    })
  }

  quarter() {
    // Every Quarter at midnight build the analytic
    const rule = new this.scheduler.RecurrenceRule()
    rule.minute = 0
    rule.hour = 0
    rule.date = 1
    rule.month = [2, 5, 8, 11]
    // Schedule the recurring job
    this.scheduler.scheduleJob('AnalyticsCron.quarter', rule, () => {
      this._analytics.quarter.forEach((analytic, name) => {
        this.app.log.debug('Run Analytic:', name)
        try {
          analytic()
        }
        catch (err) {
          this.app.log.error(err)
        }
      })
    })
  }

  year() {
    // Every Year at midnight build the analytic
    const rule = new this.scheduler.RecurrenceRule()
    rule.minute = 0
    rule.hour = 0
    rule.date = 1
    rule.month = 0
    // rule.year = 0
    // Schedule the recurring job
    this.scheduler.scheduleJob('AnalyticsCron.year', rule, () => {
      this._analytics.year.forEach((analytic, name) => {
        this.app.log.debug('Run Analytic:', name)
        try {
          analytic()
        }
        catch (err) {
          this.app.log.error(err)
        }
      })
    })
  }
}
