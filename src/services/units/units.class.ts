// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers'
import { MongoDBService } from '@feathersjs/mongodb'
import type { MongoDBAdapterParams, MongoDBAdapterOptions } from '@feathersjs/mongodb'

import type { Application } from '../../declarations'
import type { Units, UnitsData, UnitsPatch, UnitsQuery } from './units.schema'

export type { Units, UnitsData, UnitsPatch, UnitsQuery }

export interface UnitsParams extends MongoDBAdapterParams<UnitsQuery> {}

// By default calls the standard MongoDB adapter service methods but can be customized with your own functionality.
export class UnitsService<ServiceParams extends Params = UnitsParams> extends MongoDBService<
  Units,
  UnitsData,
  UnitsParams,
  UnitsPatch
> {}

export const getOptions = (app: Application): MongoDBAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('mongodbClient').then((db) => db.collection('units'))
  }
}
