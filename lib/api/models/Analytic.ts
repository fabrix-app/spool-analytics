import { FabrixModel as Model } from '@fabrix/fabrix/dist/common'
import { SequelizeResolver } from '@fabrix/spool-sequelize'

/**
 * @module Analytic
 * @description Analytic
 */
export class Analytic extends Model {

  static get resolver() {
    return SequelizeResolver
  }

  static config (app, Sequelize) {
    return {
      options: {
        underscored: true,
        scopes: {
          live: {
            where: {
              live_mode: true
            }
          }
        }
      }
    }
  }

  static schema (app, Sequelize) {
    const schema = {
      // The time of the analytic start point
      start: {
        type: Sequelize.DATE
      },
      // The time of the analytic end point
      end: {
        type: Sequelize.DATE
      },
      // The name of the analytic for searching and grouping
      name: {
        type: Sequelize.STRING
      },
      // If data is an array of arrays, the label in which they are grouped by
      group_label: {
        type: Sequelize.STRING,
        allowNull: true
      },
      // The labels for the analytic
      labels: {
        type: Sequelize.JSONB,
        defaultValue: []
      },
      // An array of the data for the analytics (can be an array of arrays)
      data: {
        type: Sequelize.JSONB,
        defaultValue: []
      },
      // A virtual field for doing compare
      // trend: {
      //   type: Sequelize.VIRTUAL(Sequelize.JSONB, ['data']),
      //   defaultValue: []
      // },
      // Live Mode
      live_mode: {
        type: Sequelize.BOOLEAN,
        defaultValue: app.config.get('engine.live_mode')
      }
    }
    return schema
  }

  /**
   * Associate the Model
   * @param models
   */
  public static associate (models) {

  }
}


export interface Analytic {
  toJSON(): any
}

/**
 *
 */
Analytic.prototype.toJSON = function() {
  // Make JSON
  const resp = this instanceof this.app.models['Analytic'].instance ? this.get({ plain: true }) : this

  // Add Trend information if available
  if (this.trend) {
    resp.trend = this.trend
  }
  if (this.trend_range) {
    resp.trend_range = this.trend_range
  }
  if (this.trend_date_range) {
    resp.trend_date_range = this.trend_date_range
  }
  return resp
}
