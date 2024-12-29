// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  unitsDataValidator,
  unitsPatchValidator,
  unitsQueryValidator,
  unitsResolver,
  unitsExternalResolver,
  unitsDataResolver,
  unitsPatchResolver,
  unitsQueryResolver
} from './units.schema'

import type { Application } from '../../declarations'
import { UnitsService, getOptions } from './units.class'
import { unitsPath, unitsMethods } from './units.shared'

export * from './units.class'
export * from './units.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const units = (app: Application) => {
  // Register our service on the Feathers application
  app.use(unitsPath, new UnitsService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: unitsMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(unitsPath).hooks({
    around: {
      all: [
        authenticate('jwt'),
        schemaHooks.resolveExternal(unitsExternalResolver),
        schemaHooks.resolveResult(unitsResolver)
      ]
    },
    before: {
      all: [schemaHooks.validateQuery(unitsQueryValidator), schemaHooks.resolveQuery(unitsQueryResolver)],
      find: [],
      get: [],
      create: [schemaHooks.validateData(unitsDataValidator), schemaHooks.resolveData(unitsDataResolver)],
      patch: [schemaHooks.validateData(unitsPatchValidator), schemaHooks.resolveData(unitsPatchResolver)],
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
    [unitsPath]: UnitsService
  }
}
