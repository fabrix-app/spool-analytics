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
    analytics: {},
    engine: {
      live_mode: false,
      profile: 'test'
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
      // '*': [ 'CheckPermissions.checkRoute' ]
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
