'use strict'
/* global describe, it */
const assert = require('assert')

describe('Analytics Cron', () => {
  it('should exist', () => {
    assert(global.app.api.crons['AnalyticsCron'])
    assert(global.app.crons['AnalyticsCron'])
  })
  it('should have scheduled jobs', () => {
    assert(global.app.scheduler.scheduledJobs['AnalyticsCron.minute'])
    assert(global.app.scheduler.scheduledJobs['AnalyticsCron.hour'])
    assert(global.app.scheduler.scheduledJobs['AnalyticsCron.day'])
    assert(global.app.scheduler.scheduledJobs['AnalyticsCron.week'])
    assert(global.app.scheduler.scheduledJobs['AnalyticsCron.month'])
    assert(global.app.scheduler.scheduledJobs['AnalyticsCron.quarter'])
    assert(global.app.scheduler.scheduledJobs['AnalyticsCron.year'])
  })
})
