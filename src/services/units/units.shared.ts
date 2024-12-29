// For more information about this file see https://dove.feathersjs.com/guides/cli/service.shared.html
import type { Params } from '@feathersjs/feathers'
import type { ClientApplication } from '../../client'
import type { Units, UnitsData, UnitsPatch, UnitsQuery, UnitsService } from './units.class'

export type { Units, UnitsData, UnitsPatch, UnitsQuery }

export type UnitsClientService = Pick<UnitsService<Params<UnitsQuery>>, (typeof unitsMethods)[number]>

export const unitsPath = 'units'

export const unitsMethods: Array<keyof UnitsService> = ['find', 'get', 'create', 'patch', 'remove']

export const unitsClient = (client: ClientApplication) => {
  const connection = client.get('connection')

  client.use(unitsPath, connection.service(unitsPath), {
    methods: unitsMethods
  })
}

// Add this service to the client service type index
declare module '../../client' {
  interface ServiceTypes {
    [unitsPath]: UnitsClientService
  }
}
