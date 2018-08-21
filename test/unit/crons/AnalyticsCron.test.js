'use strict'
/* global describe, it */
const assert = require('assert')
const _ = require('lodash')

describe('Cron', () => {
  it('should exist', () => {
    assert(global.app.api.crons)
    assert(global.app.crons)
  })
  it('should have the crons from profile testProfile', done => {
    assert(global.app.api.crons.AnalyticsCron)
    assert(global.app.crons.AnalyticsCron)
    assert.equal(global.app.crons.AnalyticsCron.id, 'analytics')
    assert.equal(global.app.crons.AnalyticsCron.name, 'AnalyticsCron')
    assert.equal(typeof global.app.crons.AnalyticsCron.minute, 'function')
    assert.equal(typeof global.app.crons.AnalyticsCron.hour, 'function')
    assert.equal(typeof global.app.crons.AnalyticsCron.day, 'function')
    assert.equal(typeof global.app.crons.AnalyticsCron.week, 'function')
    assert.equal(typeof global.app.crons.AnalyticsCron.month, 'function')
    assert.equal(typeof global.app.crons.AnalyticsCron.quarter, 'function')
    assert.equal(typeof global.app.crons.AnalyticsCron.year, 'function')
    done()
  })
})
