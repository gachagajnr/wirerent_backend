// For more information about this file see https://dove.feathersjs.com/guides/cli/client.html
import { feathers } from '@feathersjs/feathers'
import type { TransportConnection, Application } from '@feathersjs/feathers'
import authenticationClient from '@feathersjs/authentication-client'
import type { AuthenticationClientOptions } from '@feathersjs/authentication-client'

import { unitsClient } from './services/units/units.shared'
export type { Units, UnitsData, UnitsQuery, UnitsPatch } from './services/units/units.shared'

import { blocksClient } from './services/blocks/blocks.shared'
export type { Blocks, BlocksData, BlocksQuery, BlocksPatch } from './services/blocks/blocks.shared'

import { agenciesClient } from './services/agencies/agencies.shared'
export type {
  Agencies,
  AgenciesData,
  AgenciesQuery,
  AgenciesPatch
} from './services/agencies/agencies.shared'

import { userClient } from './services/users/users.shared'
export type { User, UserData, UserQuery, UserPatch } from './services/users/users.shared'

export interface Configuration {
  connection: TransportConnection<ServiceTypes>
}

export interface ServiceTypes {}

export type ClientApplication = Application<ServiceTypes, Configuration>

/**
 * Returns a typed client for the wirerent_backend app.
 *
 * @param connection The REST or Socket.io Feathers client connection
 * @param authenticationOptions Additional settings for the authentication client
 * @see https://dove.feathersjs.com/api/client.html
 * @returns The Feathers client application
 */
export const createClient = <Configuration = any,>(
  connection: TransportConnection<ServiceTypes>,
  authenticationOptions: Partial<AuthenticationClientOptions> = {}
) => {
  const client: ClientApplication = feathers()

  client.configure(connection)
  client.configure(authenticationClient(authenticationOptions))
  client.set('connection', connection)

  client.configure(userClient)
  client.configure(agenciesClient)

  client.configure(blocksClient)
  client.configure(unitsClient)
  return client
}
