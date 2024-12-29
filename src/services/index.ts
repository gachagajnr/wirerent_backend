import { units } from './units/units'
import { blocks } from './blocks/blocks'
import { agencies } from './agencies/agencies'
import { user } from './users/users'
// For more information about this file see https://dove.feathersjs.com/guides/cli/application.html#configure-functions
import type { Application } from '../declarations'

export const services = (app: Application) => {
  app.configure(units)
  app.configure(blocks)
  app.configure(agencies)
  app.configure(user)
  // All services will be registered here
}
