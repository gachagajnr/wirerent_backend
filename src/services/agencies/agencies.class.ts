// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers'
import { MongoDBService } from '@feathersjs/mongodb'
import type { MongoDBAdapterParams, MongoDBAdapterOptions } from '@feathersjs/mongodb'

import type { Application } from '../../declarations'
import type { Agencies, AgenciesData, AgenciesPatch, AgenciesQuery } from './agencies.schema'

export type { Agencies, AgenciesData, AgenciesPatch, AgenciesQuery }

export interface AgenciesParams extends MongoDBAdapterParams<AgenciesQuery> {}

// By default calls the standard MongoDB adapter service methods but can be customized with your own functionality.
export class AgenciesService<ServiceParams extends Params = AgenciesParams> extends MongoDBService<
  Agencies,
  AgenciesData,
  AgenciesParams,
  AgenciesPatch
> {}

export const getOptions = (app: Application): MongoDBAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('mongodbClient').then((db) => db.collection('agencies'))
  }
}
