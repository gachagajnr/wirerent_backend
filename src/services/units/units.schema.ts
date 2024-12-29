// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import { ObjectIdSchema } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'
import type { UnitsService } from './units.class'

// Main data model schema
export const unitsSchema = Type.Object(
  {
    _id: ObjectIdSchema(),
    text: Type.String()
  },
  { $id: 'Units', additionalProperties: false }
)
export type Units = Static<typeof unitsSchema>
export const unitsValidator = getValidator(unitsSchema, dataValidator)
export const unitsResolver = resolve<Units, HookContext<UnitsService>>({})

export const unitsExternalResolver = resolve<Units, HookContext<UnitsService>>({})

// Schema for creating new entries
export const unitsDataSchema = Type.Pick(unitsSchema, ['text'], {
  $id: 'UnitsData'
})
export type UnitsData = Static<typeof unitsDataSchema>
export const unitsDataValidator = getValidator(unitsDataSchema, dataValidator)
export const unitsDataResolver = resolve<Units, HookContext<UnitsService>>({})

// Schema for updating existing entries
export const unitsPatchSchema = Type.Partial(unitsSchema, {
  $id: 'UnitsPatch'
})
export type UnitsPatch = Static<typeof unitsPatchSchema>
export const unitsPatchValidator = getValidator(unitsPatchSchema, dataValidator)
export const unitsPatchResolver = resolve<Units, HookContext<UnitsService>>({})

// Schema for allowed query properties
export const unitsQueryProperties = Type.Pick(unitsSchema, ['_id', 'text'])
export const unitsQuerySchema = Type.Intersect(
  [
    querySyntax(unitsQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type UnitsQuery = Static<typeof unitsQuerySchema>
export const unitsQueryValidator = getValidator(unitsQuerySchema, queryValidator)
export const unitsQueryResolver = resolve<UnitsQuery, HookContext<UnitsService>>({})
