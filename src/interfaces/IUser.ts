export enum UserRole {
  SUPERVISOR = 'supervisor',
  ADMIN = 'admin',
}

export interface IUser {
  id: number
  username: string
  name: string
  role: UserRole
}
