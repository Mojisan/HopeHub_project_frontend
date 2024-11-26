import { create } from "zustand"
import { IPost } from "@/app/(web-app)/(app)/(pages)/components/post/interface"
import {
  dislikePostById,
  getPostById,
  getPosts,
  likePostById,
  post,
} from "@/services/postService"

type PostState = {
  posts: IPost[]
}

type PostActions = {
  post: (title: string, content: string, userId: string) => void
  loadPosts: () => void
  loadPost: (postId: string) => Promise<IPost>
  likePost: (postId: string) => void
  dislikePost: (postId: string) => void
}

const initialUserState: PostState = {
  posts: [],
}

export const usePostStore = create<PostState & PostActions>()((set, get) => ({
  ...initialUserState,
  loadPosts: async () => {
    try {
      const posts = await getPosts()
      set({ posts })
      console.log("Posts loaded successfully:", posts)
    } catch {
      throw Error
    }
  },
  post: async (title: string, content: string, userId: string) => {
    try {
      await post({ userId, title, content })
      console.log("Post created successfully")
      await get().loadPosts() // Reload posts after creating
    } catch {
      throw Error
    }
  },
  loadPost: async (postId: string): Promise<IPost> => {
    try {
      const post = await getPostById(postId)

      if (!post) {
        throw new Error(`Post with ID ${postId} not found`)
      }

      return post
    } catch {
      throw Error
    }
  },
  likePost: async (postId: string) => {
    try {
      await likePostById(postId)

      get().loadPosts()

      console.log("like success")
    } catch {
      throw Error
    }
  },
  dislikePost: async (postId: string) => {
    try {
      await dislikePostById(postId)

      get().loadPosts()

      console.log("dislike success")
    } catch {
      throw Error
    }
  },
}))
