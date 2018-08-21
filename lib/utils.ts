import { FabrixApp } from '@fabrix/fabrix'
import { clone } from 'lodash'
export const Utils = {
  /**
   * Add Analytics to Analytics
   * @param app
   */
  loadAnalytics: (app: FabrixApp) => {
    // Load profile
    const profile = app.config.get('analytics.profile')
    // Load Frequency
    const frequency = app.config.get('analytics.config.frequency') || {}
    // Run Analytics using the "run" method provided in each analytic
    // Then, allow the profile follow it's own pattern
    Object.keys(app.analytics || {}).forEach(function (key) {
      const analytic = app.analytics[key]
      if (
        analytic.methods && analytic.methods.indexOf('run') > -1
        && app.config.get('analytics.config.auto_run') !== false
      ) {
        analytic.run()
        app.log.debug(`Analytics auto running ${ analytic.name }`)
      }

      if (
        app.config.get('analytics.config.profiles')
        && app.config.get(`analytics.config.profiles.${profile}`)
      ) {
        app.config.get(`analytics.config.profiles.${profile}`).forEach(allowed => {
          const allowedAnalytic = allowed.split('.')[0]
          const allowedMethod = allowed.split('.')[1]
          if (
            allowedAnalytic === key
            && allowedMethod
            && analytic.methods.indexOf(allowedMethod) > -1
          ) {
            Object.entries(frequency).forEach(([_time, _analyticNames]: [string, string[]]) => {
              if (_analyticNames.indexOf(allowed) > -1) {
                app.spools.analytics.analytics[_time].add(allowed)
              }
            })
          }
        })
      }
    })
    return Promise.resolve()
  },
  /**
   * copyDefaults - Copies the default configuration so that it can be restored later
   * @param app
   * @returns {Promise.<{}>}
   */
  copyDefaults: (app: FabrixApp) => {
    app.config.set('analyticsDefaults', clone(app.config.get('analytics')))
    return Promise.resolve({})
  },

  addAnalyticToCron: (app: FabrixApp, time, analyticName) => {
    const allowedAnalyticStr = analyticName.split('.')[0]
    const allowedMethodStr = analyticName.split('.')[1]
    const analytic = app.analytics[allowedAnalyticStr][allowedMethodStr]

    app.crons.AnalyticsCron.addAnalytic(time, analyticName, analytic)
  },

  addAnalyticsToCron: (app: FabrixApp) => {
    const frequency = Object.entries(app.spools.analytics.analytics)
    frequency.forEach(([_time, setter]: [string, Set<string>]) => {
      setter.forEach(analyticName => {
        Utils.addAnalyticToCron(app, _time, analyticName)
      })
    })
  }
}
