import { clone } from 'lodash'
export const Analytics = {

  /**
   * init - Initialize
   * @param app
   */
  init: (app) => {
    // const proxyAnalytics = app.services.ProxySocialService.proxyAnalytics
  },
  /**
   * copyDefaults - Copies the default configuration so that it can be restored later
   * @param app
   * @returns {Promise.<{}>}
   */
  copyDefaults: (app) => {
    app.config.set('analyticsDefaults', clone(app.config.get('analytics')))
    return Promise.resolve({})
  }
}
