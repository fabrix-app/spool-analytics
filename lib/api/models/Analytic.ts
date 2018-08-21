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
      start: {
        type: Sequelize.DATE
      },
      end: {
        type: Sequelize.DATE
      },
      name: {
        type: Sequelize.STRING
      },
      labels: {
        type: Sequelize.JSONB,
        defaultValue: []
      },
      data: {
        type: Sequelize.JSONB,
        defaultValue: []
      },
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
