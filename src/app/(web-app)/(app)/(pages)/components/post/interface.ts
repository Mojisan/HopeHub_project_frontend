export interface IPost {
  postId: string
  postBy: IUser
  title: string
  content: string
  postAt: string
  like: number
  dislike: number
  comment: IComment[]
}

interface IUser {
  userId: string
  username: string
  firstName: string
  lastName: string
  avatar: string
}

interface IComment {
  commentBy: IUser
  commentMessage: string
  like: number
  dislike: number
}
