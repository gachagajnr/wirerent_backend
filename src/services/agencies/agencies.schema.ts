// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import { ObjectIdSchema } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'
import type { AgenciesService } from './agencies.class'

// Main data model schema
export const agenciesSchema = Type.Object(
  {
    _id: ObjectIdSchema(),
    text: Type.String()
  },
  { $id: 'Agencies', additionalProperties: false }
)
export type Agencies = Static<typeof agenciesSchema>
export const agenciesValidator = getValidator(agenciesSchema, dataValidator)
export const agenciesResolver = resolve<Agencies, HookContext<AgenciesService>>({})

export const agenciesExternalResolver = resolve<Agencies, HookContext<AgenciesService>>({})

// Schema for creating new entries
export const agenciesDataSchema = Type.Pick(agenciesSchema, ['text'], {
  $id: 'AgenciesData'
})
export type AgenciesData = Static<typeof agenciesDataSchema>
export const agenciesDataValidator = getValidator(agenciesDataSchema, dataValidator)
export const agenciesDataResolver = resolve<Agencies, HookContext<AgenciesService>>({})

// Schema for updating existing entries
export const agenciesPatchSchema = Type.Partial(agenciesSchema, {
  $id: 'AgenciesPatch'
})
export type AgenciesPatch = Static<typeof agenciesPatchSchema>
export const agenciesPatchValidator = getValidator(agenciesPatchSchema, dataValidator)
export const agenciesPatchResolver = resolve<Agencies, HookContext<AgenciesService>>({})

// Schema for allowed query properties
export const agenciesQueryProperties = Type.Pick(agenciesSchema, ['_id', 'text'])
export const agenciesQuerySchema = Type.Intersect(
  [
    querySyntax(agenciesQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type AgenciesQuery = Static<typeof agenciesQuerySchema>
export const agenciesQueryValidator = getValidator(agenciesQuerySchema, queryValidator)
export const agenciesQueryResolver = resolve<AgenciesQuery, HookContext<AgenciesService>>({})
