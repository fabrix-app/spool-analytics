'use strict'

const _ = require('lodash')
const smokesignals = require('smokesignals')
const fs = require('fs')
const path = require('path')
const TestAnalytic = require('./TestAnalytic')

const App = {
  api: {
    analytics: {
      TestAnalytic: TestAnalytic
    }
  },
  pkg: {
    name: 'spool-proxy-analytics-test',
    version: '1.0.0'
  },
  config: {
    main: {
      spools: [
        require('@fabrix/spool-router').RouterSpool,
        require('@fabrix/spool-express').ExpressSpool,
        require('@fabrix/spool-sequelize').SequelizeSpool,
        require('@fabrix/spool-engine').EngineSpool,
        require('../../dist').AnalyticsSpool // spool-proxy-analytics
      ]
    },
    analytics: {
      prefix: '/api/v1',
      profile: 'testProfile',
      config: {
        profiles: {
          testProfile: [
            'TestAnalytic.test',
            'TestAnalytic.minuteTest',
            'TestAnalytic.hourTest',
            'TestAnalytic.dayTest',
            'TestAnalytic.weekTest',
            'TestAnalytic.monthTest',
            'TestAnalytic.quarterTest',
            'TestAnalytic.yearTest'
          ]
        },
        frequency: {
          minute: [
            'TestAnalytic.minuteTest'
          ],
          hour: [
            'TestAnalytic.hourTest'
          ],
          day: [
            'TestAnalytic.dayTest'
          ],
          week: [
            'TestAnalytic.weekTest'
          ],
          month: [
            'TestAnalytic.monthTest'
          ],
          quarter: [
            'TestAnalytic.quarterTest'
          ],
          year: [
            'TestAnalytic.yearTest'
          ]
        }
      }
    },
    engine: {
      prefix: '/api/v1',
      live_mode: false,
      profile: 'testProfile',
      crons_config: {
        profiles: {
          testProfile: [
            'AnalyticsCron.minute',
            'AnalyticsCron.hour',
            'AnalyticsCron.day',
            'AnalyticsCron.week',
            'AnalyticsCron.month',
            'AnalyticsCron.quarter',
            'AnalyticsCron.year'
          ]
        }
      }
    },
    web: {
      express: require('express'),
      middlewares: {
        order: [
          'static',
          'addMethods',
          'cookieParser',
          'session',
          'bodyParser',
          'methodOverride',
          'router',
          'www',
          '404',
          '500'
        ],
        static: require('express').static('test/static')
      }
    },
    stores: {
      sqlitedev: {
        orm: 'sequelize',
        database: 'Sequelize',
        host: '127.0.0.1',
        dialect: 'postgres',
        migrate: 'drop'
      }
    },
    models: {
      defaultStore: 'sqlitedev',
      migrate: 'drop'
    },
    policies: {
      // '*': {
      //   '*': [ 'CheckPermissions.checkRoute' ]
      // }
    },
    session: {
      secret: 'analytics'
    }
  }
}

const dbPath = path.resolve(__dirname, './test.sqlite')
if (fs.existsSync(dbPath)) {
  fs.unlinkSync(dbPath)
}
const uploadPath = path.resolve(__dirname, './test.uploads.sqlite')
if (fs.existsSync(uploadPath)) {
  fs.unlinkSync(uploadPath)
}

_.defaultsDeep(App, smokesignals.FailsafeConfig)
module.exports = App
