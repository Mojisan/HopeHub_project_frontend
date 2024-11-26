import { IComment } from "@/app/(web-app)/(app)/(pages)/components/post/interface"
import { AxiosPrivateInstance } from "@/axios"

interface IPostCommentPayloads {
  userId: string
  postId: string
  comment: string
}

interface IPostCommentResponse {
  message: string
}

export const postComment = async (
  payload: IPostCommentPayloads
): Promise<IPostCommentResponse> => {
  try {
    const response = await AxiosPrivateInstance.post<IPostCommentResponse>(
      "http://localhost:5000/api/comment",
      payload
    )
    return response.data
  } catch {
    throw Error
  }
}

export const getComments = async (): Promise<IComment[]> => {
  try {
    const response = await AxiosPrivateInstance.get<IComment[]>(
      "http://localhost:5000/api/comments"
    )
    return response.data
  } catch {
    throw Error
  }
}

export const likeCommentById = async (commentId: string): Promise<IComment> => {
  try {
    const response = await AxiosPrivateInstance.put<IComment>(
      `http://localhost:5000/api/post/${commentId}/like`
    )
    return response.data
  } catch {
    throw Error
  }
}

export const dislikeCommentById = async (
  commentId: string
): Promise<IComment> => {
  try {
    const response = await AxiosPrivateInstance.put<IComment>(
      `http://localhost:5000/api/post/${commentId}/dislike`
    )
    return response.data
  } catch {
    throw Error
  }
}
