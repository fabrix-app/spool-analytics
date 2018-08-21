import { FabrixController as Controller } from '@fabrix/fabrix/dist/common'

/**
 * @module AnalyticsController
 * @description Fabrix Controller.
 */
export class AnalyticsController extends Controller {
  create(req, res) {
    //
    res.json({})
  }
  findOne(req, res) {
    //
    res.json({})
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

