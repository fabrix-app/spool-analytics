'use strict'
/* global describe, it */
const assert = require('assert')

describe('Analytic Model', () => {
  it('should exist', () => {
    assert(global.app.api.models['Analytic'])
  })
})
