import { FabrixApp } from '@fabrix/fabrix'
import { difference } from 'lodash'

export class Analytic {
  app: FabrixApp
  publish
  build

  constructor (app) {
    Object.defineProperties(this, {
      app: {
        enumerable: false,
        value: app
      },
      /**
       * If the analytic is now immutable
       */
      immutable: {
        enumerable: false,
        value: false,
        writable: true
      },
      /**
       * Freezes the immutability of the analytic
       */
      freeze: {
        enumerable: false,
        value: function () {
          this.immutable = true
        },
        writable: true
      },
      /**
       * Unfreezes the immutability of the analytic
       */
      unfreeze: {
        enumerable: false,
        value: function () {
          this.immutable = false
        },
        writable: true
      },
      build: {
        enumerable: false,
        value: function() {
          const unhallowedMethods = ['publish', 'build']
          const allowedMethods = difference(this.methods, unhallowedMethods)
          return Promise.all(allowedMethods.map(method => {
            return this[method]()
          }))
        },
        writable: true
      },
      publish: {
        enumerable: false,
        value: function(results, options = {}) {
          return app.models.Analytics.bulkCreate(results, options)
        },
        writable: true
      }
    })
  }

  /**
   * Return the id of this analytic
   */
  get id () {
    return this.constructor.name.replace(/(\w+)Analytic/, '$1').toLowerCase()
  }

  /**
   * Gets the name of the analytic class
   */
  get name() {
    return this.constructor.name
  }

}
