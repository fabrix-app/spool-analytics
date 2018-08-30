'use strict'
/* global describe, it */
const assert = require('assert')
const supertest = require('supertest')
const moment = require('moment')

describe('AnalyticsController', () => {
  let adminUser
  let prefix

  before((done) => {
    adminUser = supertest.agent(global.app.spools.express.server)
    prefix = global.app.config.get('analytics.prefix')
    global.app.analytics.TestAnalytic.publish([
      {
        name: 'testName',
        start: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
        end: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
        labels: ['test'],
        data: [1]
      },
      {
        name: 'testName2',
        start: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
        end: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
        group_label: 'currency',
        labels: ['test', 'currency'],
        data: [[1, 'USD']]
      },
      {
        name: 'testName2',
        start: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
        end: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
        group_label: 'currency',
        labels: ['test', 'currency'],
        data: [[1, 'USD']]
      }
    ])
      .then(analytics => {
        return global.app.analytics.TestAnalytic.publish([
          {
            name: 'testName',
            start: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
            end: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
            labels: ['test'],
            data: [2]
          },
          {
            name: 'testName2',
            start: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
            end: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
            group_label: 'currency',
            labels: ['test', 'currency'],
            data: [[2, 'USD']]
          }
        ])
      })
      .then(analytics => {
        done()
      })
      .catch(err => {
        done(err)
      })
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
  it('should compare an analytic', (done) => {
    adminUser
      .get(prefix + '/analytic/testName/compare')
      .expect(200)
      .end((err, res) => {
        assert.ok(res.body.trend)
        assert.equal(res.body.trend[0], 1)
        done(err)
      })
  })
  it('should compare a grouped analytic', (done) => {
    adminUser
      .get(prefix + '/analytic/testName2/compare')
      .expect(200)
      .end((err, res) => {
        assert.ok(res.body.trend)
        assert.equal(res.body.trend[0][0], 1)
        assert.equal(res.body.trend[0][1], 'USD')
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
