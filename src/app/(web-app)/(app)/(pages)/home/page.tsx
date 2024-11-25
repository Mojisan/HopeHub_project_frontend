"use client"

import { useEffect } from "react"
import { usePostStore } from "@/stores/usePostStore"
import { Flex } from "@mantine/core"
import Post from "../components/post/post"
import CreatePost from "../components/createPost/createPost"

const HomePage = () => {
  const { loadPosts, posts } = usePostStore()

  useEffect(() => {
    loadPosts()
  }, [loadPosts])

  return (
    <Flex direction='column' mt={-60} gap='lg'>
      <CreatePost />

      {posts.length > 0 ? (
        posts.map((post) =>
          post.postBy ? (
            <Post key={post.postId} post={post} />
          ) : (
            <div key={post.postId}>Post has no author</div>
          )
        )
      ) : (
        <div>Loading posts...</div>
      )}
    </Flex>
  )
}

export default HomePage
