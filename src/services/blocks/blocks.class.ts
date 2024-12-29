// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers'
import { MongoDBService } from '@feathersjs/mongodb'
import type { MongoDBAdapterParams, MongoDBAdapterOptions } from '@feathersjs/mongodb'

import type { Application } from '../../declarations'
import type { Blocks, BlocksData, BlocksPatch, BlocksQuery } from './blocks.schema'

export type { Blocks, BlocksData, BlocksPatch, BlocksQuery }

export interface BlocksParams extends MongoDBAdapterParams<BlocksQuery> {}

// By default calls the standard MongoDB adapter service methods but can be customized with your own functionality.
export class BlocksService<ServiceParams extends Params = BlocksParams> extends MongoDBService<
  Blocks,
  BlocksData,
  BlocksParams,
  BlocksPatch
> {}

export const getOptions = (app: Application): MongoDBAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('mongodbClient').then((db) => db.collection('blocks'))
  }
}
