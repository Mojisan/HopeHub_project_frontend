import React from "react"
import { Flex } from "@mantine/core"
import Post from "../../../components/post/post"

const FeedProfile = () => {
  return (
    <Flex direction='column' align='center' w='100%' gap='lg' mt='lg'>
      <Post postId='1' />
      <Post postId='2' />
    </Flex>
  )
}

export default FeedProfile
