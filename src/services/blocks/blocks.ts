// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  blocksDataValidator,
  blocksPatchValidator,
  blocksQueryValidator,
  blocksResolver,
  blocksExternalResolver,
  blocksDataResolver,
  blocksPatchResolver,
  blocksQueryResolver
} from './blocks.schema'

import type { Application } from '../../declarations'
import { BlocksService, getOptions } from './blocks.class'
import { blocksPath, blocksMethods } from './blocks.shared'

export * from './blocks.class'
export * from './blocks.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const blocks = (app: Application) => {
  // Register our service on the Feathers application
  app.use(blocksPath, new BlocksService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: blocksMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(blocksPath).hooks({
    around: {
      all: [
        authenticate('jwt'),
        schemaHooks.resolveExternal(blocksExternalResolver),
        schemaHooks.resolveResult(blocksResolver)
      ]
    },
    before: {
      all: [schemaHooks.validateQuery(blocksQueryValidator), schemaHooks.resolveQuery(blocksQueryResolver)],
      find: [],
      get: [],
      create: [schemaHooks.validateData(blocksDataValidator), schemaHooks.resolveData(blocksDataResolver)],
      patch: [schemaHooks.validateData(blocksPatchValidator), schemaHooks.resolveData(blocksPatchResolver)],
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
    [blocksPath]: BlocksService
  }
}
