'use strict'
/* global describe, it */
const assert = require('assert')

describe('Test Analytics', () => {
  it('should exist', () => {
    assert(global.app.api.analytics)
    assert(global.app.analytics)
  })
  it('should exist', () => {
    assert(global.app.api.analytics.TestAnalytic)
    assert(global.app.analytics.TestAnalytic)
  })
})
