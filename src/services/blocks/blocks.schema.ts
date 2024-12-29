// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import { ObjectIdSchema } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'
import type { BlocksService } from './blocks.class'

// Main data model schema
export const blocksSchema = Type.Object(
  {
    _id: ObjectIdSchema(),
    text: Type.String()
  },
  { $id: 'Blocks', additionalProperties: false }
)
export type Blocks = Static<typeof blocksSchema>
export const blocksValidator = getValidator(blocksSchema, dataValidator)
export const blocksResolver = resolve<Blocks, HookContext<BlocksService>>({})

export const blocksExternalResolver = resolve<Blocks, HookContext<BlocksService>>({})

// Schema for creating new entries
export const blocksDataSchema = Type.Pick(blocksSchema, ['text'], {
  $id: 'BlocksData'
})
export type BlocksData = Static<typeof blocksDataSchema>
export const blocksDataValidator = getValidator(blocksDataSchema, dataValidator)
export const blocksDataResolver = resolve<Blocks, HookContext<BlocksService>>({})

// Schema for updating existing entries
export const blocksPatchSchema = Type.Partial(blocksSchema, {
  $id: 'BlocksPatch'
})
export type BlocksPatch = Static<typeof blocksPatchSchema>
export const blocksPatchValidator = getValidator(blocksPatchSchema, dataValidator)
export const blocksPatchResolver = resolve<Blocks, HookContext<BlocksService>>({})

// Schema for allowed query properties
export const blocksQueryProperties = Type.Pick(blocksSchema, ['_id', 'text'])
export const blocksQuerySchema = Type.Intersect(
  [
    querySyntax(blocksQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type BlocksQuery = Static<typeof blocksQuerySchema>
export const blocksQueryValidator = getValidator(blocksQuerySchema, queryValidator)
export const blocksQueryResolver = resolve<BlocksQuery, HookContext<BlocksService>>({})
