import { User } from './user.type'
import { SuccessResponseAPI } from './utils.type'

export type AuthResponse = SuccessResponseAPI<{
  access_token: string
  expires: string
  user: User
}>
