'use strict'

const assert = require('assert')

describe('Spool', () => {
  let spool
  before(() => {
    spool = global.app.spools['analytics']
  })
  it.skip('should be loaded into the app.spools collection', () => {
    assert(spool)
  })
  describe('#validate', () => {
    it.skip('TODO test')
  })
  describe('#configure', () => {
    it.skip('TODO test')
  })
  describe('#initialize', () => {
    it('Should have scheduled the jobs through the AnalyticsCron', () => {

      Object.entries(global.app.scheduler.scheduledJobs).forEach(([_name, job]) => {
        // console.log('BROKE', _name, job)
        console.log('NEXT RUN', _name, job.nextInvocation())
      })
    })
  })
})
