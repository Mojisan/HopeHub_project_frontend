import { create } from "zustand"
import { IComment } from "@/app/(web-app)/(app)/(pages)/components/post/interface"
import {
  dislikeCommentById,
  getComments,
  likeCommentById,
  postComment,
} from "@/services/commentService"

type CommentState = {
  comments: IComment[]
}

type CommentActions = {
  postComment: (postId: string, comment: string, userId: string) => void
  likeComment: (commentId: string) => void
  dislikeComment: (commentId: string) => void
}

const initialUserState: CommentState = {
  comments: [],
}

export const useCommentStore = create<CommentState & CommentActions>()(
  (set, get) => ({
    ...initialUserState,
    postComment: async (postId: string, comment: string, userId: string) => {
      try {
        await postComment({ userId, postId, comment })
        console.log("Comment created successfully")
      } catch {
        throw Error
      }
    },
    likeComment: async (commentId: string) => {
      try {
        await likeCommentById(commentId)

        console.log("like success")
      } catch {
        throw Error
      }
    },
    dislikeComment: async (commentId: string) => {
      try {
        await dislikeCommentById(commentId)

        console.log("dislike success")
      } catch {
        throw Error
      }
    },
  })
)
