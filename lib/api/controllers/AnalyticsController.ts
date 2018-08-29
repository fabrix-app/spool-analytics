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

  // TODO
  findGroup(req, res) {
    const Analytics = this.app.models['Analytic']
    const start = moment(req.query.start)
    const end = moment(req.query.end || Date.now())
    const name = req.params.name

    Analytics.findAll({
      where: {
        name: name,
        start: {
          $gte: start.format('YYYY-MM-DD HH:mm:ss')
        },
        end: {
          $gte: end.format('YYYY-MM-DD HH:mm:ss')
        }
      }
    })
      .then(analytic => {
        return res.json(analytic)
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

