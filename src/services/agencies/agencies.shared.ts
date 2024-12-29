// For more information about this file see https://dove.feathersjs.com/guides/cli/service.shared.html
import type { Params } from '@feathersjs/feathers'
import type { ClientApplication } from '../../client'
import type { Agencies, AgenciesData, AgenciesPatch, AgenciesQuery, AgenciesService } from './agencies.class'

export type { Agencies, AgenciesData, AgenciesPatch, AgenciesQuery }

export type AgenciesClientService = Pick<
  AgenciesService<Params<AgenciesQuery>>,
  (typeof agenciesMethods)[number]
>

export const agenciesPath = 'agencies'

export const agenciesMethods: Array<keyof AgenciesService> = ['find', 'get', 'create', 'patch', 'remove']

export const agenciesClient = (client: ClientApplication) => {
  const connection = client.get('connection')

  client.use(agenciesPath, connection.service(agenciesPath), {
    methods: agenciesMethods
  })
}

// Add this service to the client service type index
declare module '../../client' {
  interface ServiceTypes {
    [agenciesPath]: AgenciesClientService
  }
}
