'use strict'
/* global describe, it */
const assert = require('assert')
const supertest = require('supertest')

describe('AnalyticsController', () => {
  let adminUser
  let prefix

  before((done) => {
    adminUser = supertest.agent(global.app.spools.express.server)
    prefix = global.app.config.get('analytics.prefix')
    done()
  })

  it('should exist', () => {
    assert(global.app.api.controllers['AnalyticsController'])
    assert(global.app.controllers['AnalyticsController'])
  })
  it('should find all analytics', (done) => {
    adminUser
      .get(prefix + '/analytics')
      .expect(200)
      .end((err, res) => {
        done(err)
      })
  })
  it('should find an analytic', (done) => {
    adminUser
      .get(prefix + '/analytic/testName')
      .expect(200)
      .end((err, res) => {
        done(err)
      })
  })
  it('should find an analytic group', (done) => {
    adminUser
      .get(prefix + '/analytic/testName/group')
      .expect(200)
      .end((err, res) => {
        done(err)
      })
  })
})
