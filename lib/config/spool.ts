/**
 * Spool Configuration
 *
 * @see {@link http://fabrixjs.io/doc/spool/config
 */
export const spool = {
  type: 'misc',
  /**
   * API and config resources provided by this Spool.
   */
  provides: {
    resources: ['crons', 'services', 'models'],
    api: {
      crons: ['AnalyticsCron'],
      services: ['AnalyticsService'],
      models: ['Analytic']
    },
    config: [ 'analytics', 'routes' ]
  },
  /**
   * Configure the lifecycle of this pack; that is, how it boots up, and which
   * order it loads relative to other spools.
   */
  lifecycle: {
    configure: {
      /**
       * List of events that must be fired before the configure lifecycle
       * method is invoked on this Spool
       */
      listen: ['spool:sequelize:configured'],

      /**
       * List of events emitted by the configure lifecycle method
       */
      emit: []
    },
    initialize: {
      listen: ['spool:sequelize:initialized'],
      emit: []
    }
  }
}

