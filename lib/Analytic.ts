import { FabrixApp } from '@fabrix/fabrix'
import { FabrixGeneric } from '@fabrix/fabrix/dist/common'
import { difference } from 'lodash'


export class Analytic extends FabrixGeneric {
  publish
  build

  constructor (app: FabrixApp) {
    super(app)

    Object.defineProperties(this, {
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
          return app.models.Analytic.bulkCreate(results, options)
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
