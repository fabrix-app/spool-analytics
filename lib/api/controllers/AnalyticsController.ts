import { FabrixController as Controller } from '@fabrix/fabrix/dist/common'
import * as moment from 'moment'
/**
 * @module AnalyticsController
 * @description Fabrix Controller.
 */
export class AnalyticsController extends Controller {
  create(req, res) {
    // TODO
    res.json({})
  }

  findOne(req, res) {
    const Analytics = this.app.models['Analytic']
    const name = req.params.name

    Analytics.findOne({
      where: {
        name: name
      }
    })
      .then(analytic => {
        return res.json(analytic)
      })
      .catch(err => {
        return res.serverError(err)
      })
  }

  findCompare(req, res) {
    this.app.services.AnalyticsService.findCompare(req.params)
      .then(analytic => {
        return res.json(analytic)
      })
      .catch(err => {
        return res.serverError(err)
      })
  }

  findGroup(req, res) {
    this.app.services.AnalyticsService.findGroup(req.params, req.query)
      .then(analytics => {
        return res.json(analytics)
      })
      .catch(err => {
        return res.serverError(err)
      })

  }

  findAll(req, res) {
    const Analytics = this.app.models['Analytic']
    const limit = Math.max(0, req.query.limit || 10)
    const offset = Math.max(0, req.query.offset || 0)
    const sort = req.query.sort || [['created_at', 'DESC']]
    const where = req.jsonCriteria(req.query.where)

    Analytics.findAndCountAll({
      order: sort,
      offset: offset,
      limit: limit,
      where: where
    })
      .then( analytics => {
        // Paginate
        res.paginate(analytics.count, limit, offset, sort)
        return res.json(analytics.rows)
      })
      .catch(err => {
        return res.serverError(err)
      })
  }
}

