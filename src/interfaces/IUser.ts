export enum UserRole {
  SUPERVISOR = "supervisor",
  ADMIN = "admin",
}

export interface IUser {
  userId: string
  firstName: string
  lastName: string
  username: string
  bio: string
  avatar: string
  follower: number
  following: number
}
