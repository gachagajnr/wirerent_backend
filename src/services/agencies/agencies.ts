// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  agenciesDataValidator,
  agenciesPatchValidator,
  agenciesQueryValidator,
  agenciesResolver,
  agenciesExternalResolver,
  agenciesDataResolver,
  agenciesPatchResolver,
  agenciesQueryResolver
} from './agencies.schema'

import type { Application } from '../../declarations'
import { AgenciesService, getOptions } from './agencies.class'
import { agenciesPath, agenciesMethods } from './agencies.shared'

export * from './agencies.class'
export * from './agencies.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const agencies = (app: Application) => {
  // Register our service on the Feathers application
  app.use(agenciesPath, new AgenciesService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: agenciesMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(agenciesPath).hooks({
    around: {
      all: [
        authenticate('jwt'),
        schemaHooks.resolveExternal(agenciesExternalResolver),
        schemaHooks.resolveResult(agenciesResolver)
      ]
    },
    before: {
      all: [
        schemaHooks.validateQuery(agenciesQueryValidator),
        schemaHooks.resolveQuery(agenciesQueryResolver)
      ],
      find: [],
      get: [],
      create: [
        schemaHooks.validateData(agenciesDataValidator),
        schemaHooks.resolveData(agenciesDataResolver)
      ],
      patch: [
        schemaHooks.validateData(agenciesPatchValidator),
        schemaHooks.resolveData(agenciesPatchResolver)
      ],
      remove: []
    },
    after: {
      all: []
    },
    error: {
      all: []
    }
  })
}

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    [agenciesPath]: AgenciesService
  }
}
