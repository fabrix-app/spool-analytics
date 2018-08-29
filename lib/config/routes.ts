import * as joi from 'joi'
export const routes = {
  '/analytics': {
    'GET': {
      handler: 'AnalyticsController.findAll',
      config: {
        prefix: 'analytics.prefix',
        validate: {
          query: {
            offset: joi.number(),
            limit: joi.number(),
            where: joi.object(),
            sort: joi.array().items(joi.array()),
          }
        },
        app: {
          permissions: {
            resource_name: 'apiGetAnalyticsRoute',
            roles: ['admin']
          }
        }
      }
    },
    'POST': {
      handler: 'AnalyticsController.create',
      config: {
        prefix: 'analytics.prefix',
        app: {
          permissions: {
            resource_name: 'apiPostAnalyticsRoute',
            roles: ['admin']
          }
        }
      }
    }
  },
  '/analytic/:name': {
    'GET': 'AnalyticsController.findOne',
    config: {
      prefix: 'analytics.prefix',
      validate: {
        params: {
          name: joi.string().required()
        }
      },
      app: {
        permissions: {
          resource_name: 'apiGetAnalyticNameRoute',
          roles: ['admin']
        }
      }
    }
  },
  '/analytic/:name/group': {
    'GET': 'AnalyticsController.findGroup',
    config: {
      prefix: 'analytics.prefix',
      validate: {
        params: {
          name: joi.string().required()
        },
        query: {
          start: joi.number(),
          end: joi.number()
        }
      },
      app: {
        permissions: {
          resource_name: 'apiGetAnalyticNameGroupRoute',
          roles: ['admin']
        }
      }
    }
  }
}
