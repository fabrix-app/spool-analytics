import { Cron } from '@fabrix/spool-engine'

export class AnalyticsCron extends Cron {
  build() {
    // Every Day at midnight build the analytic
    const rule = new this.scheduler.RecurrenceRule()
    rule.minute = 0
    rule.hour = 24
    // Schedule the recurring job
    this.scheduler.scheduleJob('AnalyticsCron.build', rule, () => {
      this.app.services.AnalyticsService.build()
        .catch(err => {
          this.app.log.error(err)
        })
    })
  }
}
