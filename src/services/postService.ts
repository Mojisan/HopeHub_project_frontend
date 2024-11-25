import { IPost } from "@/app/(web-app)/(app)/(pages)/components/post/interface"
import { AxiosPrivateInstance } from "@/axios"

interface IPostPayload {
  userId: string
  title: string
  content: string
}

interface IPostResponse {
  message: string
}

const API_PATH = "http://localhost:5000/api/addPost"

export const post = async (payload: IPostPayload): Promise<IPostResponse> => {
  try {
    const response = await AxiosPrivateInstance.post<IPostResponse>(
      API_PATH,
      payload
    )
    return response.data
  } catch {
    throw Error
  }
}

export const getPosts = async (): Promise<IPost[]> => {
  try {
    const response = await AxiosPrivateInstance.get<IPost[]>(
      "http://localhost:5000/api/posts"
    )
    return response.data
  } catch {
    throw Error
  }
}

export const getPostById = async (postId: string): Promise<IPost> => {
  try {
    const response = await AxiosPrivateInstance.get<IPost>(
      `http://localhost:5000/api/post/${postId}`
    )
    return response.data
  } catch {
    throw Error
  }
}
