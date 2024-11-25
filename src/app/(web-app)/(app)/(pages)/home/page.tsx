"use client"

import React from "react"
import { Flex } from "@mantine/core"
import Post from "../components/post/post"
import CreatePost from "../components/createPost/createPost"

const HomePage = () => {
  return (
    <Flex direction='column' mt={-60} gap='lg'>
      <CreatePost />
      <Post postId='1' />
      <Post postId='2' />
    </Flex>
  )
}

export default HomePage
