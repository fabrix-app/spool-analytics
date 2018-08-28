'use strict'
/* global describe, it */
const assert = require('assert')

describe('Test Analytic', () => {
  it('should exist', () => {
    assert(global.app.api.analytics['TestAnalytic'])
    assert(global.app.analytics['TestAnalytic'])
  })
  it('should have an instance of app', () => {
    assert.equal(global.app, global.app.analytics['TestAnalytic'].app)
  })
  it('should publish', (done) => {
    global.app.analytics['TestAnalytic'].publish([{
      name: 'test.analytic'
    }])
      .then(analytics => {
        // console.log('PUBLISH TEST', analytics)
        assert.equal(analytics.length, 1)
        done()
      })
      .catch(err => {
        done(err)
      })
  })
})
