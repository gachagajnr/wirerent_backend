// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import { ObjectIdSchema } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'
import { passwordHash } from '@feathersjs/authentication-local'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'
import type { UserService } from './users.class'

// Main data model schema
export const userSchema = Type.Object(
  {
    _id: ObjectIdSchema(),
    email: Type.String(),
    password: Type.Optional(Type.String()),
    googleId: Type.Optional(Type.String()),
    facebookId: Type.Optional(Type.String()),
    twitterId: Type.Optional(Type.String()),
    name: Type.String(),
    // surname:  Type.String(),
    phone: Type.String(),
    orgName:  Type.String(),
    // profilePicture: Type.String(),
    role: Type.String(),
    resetPassword:  Type.Boolean(),
    isRoot: Type.Boolean(),
    isVerified: Type.Boolean(),
    // agency: Type.Union([Type.Null(), Type.String({ format: 'object-id' })]), // Reference to "agents"
    // building: Type.Union([Type.Null(), Type.String({ format: 'object-id' })]), // Reference to "buildings"


    // verifyToken: Type.String(),
    // verifyExpires: Type.Date(),
    // verifyChanges: Type.Object(Type.Any()),
    // resetToken: Type.String(),
    //   verifyShortToken: Type.String(),
      // resetShortToken: { type: String }, // Stores the rest token

    // resetExpires: Type.Date(),
    // isAdminVerified:Type.Boolean(),
    // organization: Type.Union([Type.Null(), Type.String({ format: 'object-id' })]), // Reference to "agents"

    // rooms: Type.Array(
      // Type.Union([Type.Null(), Type.String({ format: 'object-id' })]) // Reference to "agents"
    // ),
  }, 
  { $id: 'User', additionalProperties: false }
)
export type User = Static<typeof userSchema>
export const userValidator = getValidator(userSchema, dataValidator)
export const userResolver = resolve<User, HookContext<UserService>>({})

export const userExternalResolver = resolve<User, HookContext<UserService>>({
  // The password should never be visible externally
  password: async () => undefined
})

// Schema for creating new entries
export const userDataSchema = Type.Pick(
  userSchema,
  ['email', 'password', 'googleId', 'facebookId', 'twitterId'],
  {
    $id: 'UserData'
  }
)
export type UserData = Static<typeof userDataSchema>
export const userDataValidator = getValidator(userDataSchema, dataValidator)
export const userDataResolver = resolve<User, HookContext<UserService>>({
  password: passwordHash({ strategy: 'local' })
})

// Schema for updating existing entries
export const userPatchSchema = Type.Partial(userSchema, {
  $id: 'UserPatch'
})
export type UserPatch = Static<typeof userPatchSchema>
export const userPatchValidator = getValidator(userPatchSchema, dataValidator)
export const userPatchResolver = resolve<User, HookContext<UserService>>({
  password: passwordHash({ strategy: 'local' })
})

// Schema for allowed query properties
export const userQueryProperties = Type.Pick(userSchema, [
  '_id',
  'email',
  'googleId',
  'facebookId',
  'twitterId'
])
export const userQuerySchema = Type.Intersect(
  [
    querySyntax(userQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type UserQuery = Static<typeof userQuerySchema>
export const userQueryValidator = getValidator(userQuerySchema, queryValidator)
export const userQueryResolver = resolve<UserQuery, HookContext<UserService>>({
  // If there is a user (e.g. with authentication), they are only allowed to see their own data
  _id: async (value, user, context) => {
    if (context.params.user) {
      return context.params.user._id
    }

    return value
  }
})
