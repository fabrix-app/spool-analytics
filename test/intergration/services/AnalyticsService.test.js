'use strict'
/* global describe, it */
const assert = require('assert')

describe('AnalyticsService', () => {
  let analyticsID
  let token
  it('should exist', () => {
    assert(global.app.api.services['AnalyticsService'])
  })
})
