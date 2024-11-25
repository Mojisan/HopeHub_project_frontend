import { create } from "zustand"
import { IPost } from "@/app/(web-app)/(app)/(pages)/components/post/interface"
import { getPosts, post } from "@/services/postService"

type PostState = {
  posts: IPost[]
}

type PostActions = {
  post: (title: string, content: string, userId: string) => void
  loadPosts: () => void
}

const initialUserState: PostState = {
  posts: [],
}

export const usePostStore = create<PostState & PostActions>()((set, get) => ({
  ...initialUserState,
  post: async (title: string, content: string, userId: string) => {
    try {
      await post({ userId, title, content })

      console.log("success")
    } catch {
      throw Error
    }
  },
  loadPosts: async () => {
    try {
      const posts = await getPosts()

      set({
        posts,
      })

      console.log("success")
    } catch {
      throw Error
    }
  },
}))
