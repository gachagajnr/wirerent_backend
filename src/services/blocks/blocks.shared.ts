// For more information about this file see https://dove.feathersjs.com/guides/cli/service.shared.html
import type { Params } from '@feathersjs/feathers'
import type { ClientApplication } from '../../client'
import type { Blocks, BlocksData, BlocksPatch, BlocksQuery, BlocksService } from './blocks.class'

export type { Blocks, BlocksData, BlocksPatch, BlocksQuery }

export type BlocksClientService = Pick<BlocksService<Params<BlocksQuery>>, (typeof blocksMethods)[number]>

export const blocksPath = 'blocks'

export const blocksMethods: Array<keyof BlocksService> = ['find', 'get', 'create', 'patch', 'remove']

export const blocksClient = (client: ClientApplication) => {
  const connection = client.get('connection')

  client.use(blocksPath, connection.service(blocksPath), {
    methods: blocksMethods
  })
}

// Add this service to the client service type index
declare module '../../client' {
  interface ServiceTypes {
    [blocksPath]: BlocksClientService
  }
}
