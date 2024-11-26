import React, { useEffect } from "react"
import { Flex } from "@mantine/core"
import Post from "../../../components/post/post"
import CreatePost from "../../../components/createPost/createPost"
import { usePostStore } from "@/stores/usePostStore"
import { useUserStore } from "@/stores/useUserStore"

const FeedProfile = () => {
  const { loadPosts, posts } = usePostStore()
  const { userId } = useUserStore()

  useEffect(() => {
    loadPosts()
  }, [loadPosts])

  return (
    <Flex direction='column' align='center' w='100%' gap='lg' mt='lg'>
      <Flex direction='column' gap='lg' w='40%'>
        <CreatePost />
        {posts.length > 0 ? (
          posts
            .filter((post) => post.postBy?.userId === userId)
            .slice()
            .sort((a, b) => {
              const dateA = new Date(a.postAt).getTime()
              const dateB = new Date(b.postAt).getTime()
              return dateB - dateA
            })
            .map((post) =>
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
    </Flex>
  )
}

export default FeedProfile
