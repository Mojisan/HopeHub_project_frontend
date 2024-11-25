import { create } from "zustand"
import { IPost } from "@/app/(web-app)/(app)/(pages)/components/post/interface"
import { getPostById, getPosts, post } from "@/services/postService"

type PostState = {
  posts: IPost[]
}

type PostActions = {
  post: (title: string, content: string, userId: string) => void
  loadPosts: () => void
  loadPost: (postId: string) => Promise<IPost>
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
    } catch (error) {
      throw Error
    }
  },
  post: async (title: string, content: string, userId: string) => {
    try {
      await post({ userId, title, content })
      console.log("Post created successfully")
      await get().loadPosts() // Reload posts after creating
    } catch (error) {
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
    } catch (error) {
      throw error
    }
  },
}))
