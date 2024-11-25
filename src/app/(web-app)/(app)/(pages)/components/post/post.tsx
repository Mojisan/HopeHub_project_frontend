// Post.tsx
import {
  ActionIcon,
  Avatar,
  Divider,
  Flex,
  Paper,
  Text,
  TextInput,
} from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import {
  IconBubbleText,
  IconDirectionSignFilled,
  IconHeart,
  IconHeartBroken,
} from "@tabler/icons-react"
import React, { useEffect, useState } from "react"
import PostModal from "../postModal/postModal"
import { IPost } from "./interface"

interface IPostAugument {
  post: IPost
}

const Post: React.FC<IPostAugument> = ({ post }) => {
  const [isLike, setIsLike] = useState<boolean>(false)
  const [opened, { open, close }] = useDisclosure(false)

  const handleLikePost = () => {
    console.log(post)
    setIsLike(!isLike)
  }

  return (
    <Paper
      shadow='sm'
      p='lg'
      radius='md'
      withBorder
      style={{
        width: "100%",
      }}
    >
      {post ? (
        <>
          <Flex gap='lg' direction='column'>
            {/* Post Header */}
            <Flex gap='md'>
              <Avatar
                src={post.postBy.avatar}
                alt='profile'
                radius='xl'
                size='lg'
                color='white'
              />
              <Flex direction='column'>
                <Text size='md' fw='normal'>
                  {post.postBy.firstName + " " + post.postBy.lastName}
                </Text>
                <Text size='sm' fw='lighter'>
                  @{post.postBy.username} · 23 hours ago
                </Text>
              </Flex>
            </Flex>

            {/* Post Content */}
            <Flex direction='column'>
              <Text size='lg'>{post.title}</Text>
              <Text size='sm'>{post.content}</Text>
            </Flex>

            {/* Actions */}
            <Flex justify='space-evenly' align='center'>
              <Flex align='center' gap='sm'>
                <ActionIcon
                  variant='subtle'
                  disabled={isLike}
                  onClick={handleLikePost}
                >
                  <IconHeart />
                </ActionIcon>
                <Text size='sm'>{post.like}</Text>
              </Flex>
              <Flex align='center' gap='sm'>
                <ActionIcon
                  variant='subtle'
                  disabled={!isLike}
                  onClick={handleLikePost}
                >
                  <IconHeartBroken />
                </ActionIcon>
                <Text size='sm'>{post.dislike}</Text>
              </Flex>
              <Flex align='center' gap='sm'>
                <ActionIcon variant='subtle' onClick={open}>
                  <IconBubbleText />
                </ActionIcon>
                <Text size='sm'>{post.comment.length}</Text>
              </Flex>
            </Flex>

            <Divider />

            {/* Comment Input */}
            <Flex align='center' gap='lg'>
              <Avatar
                src={post.postBy.avatar}
                alt='profile'
                radius='xl'
                size='lg'
                color='white'
              />
              <TextInput placeholder='Add a comment' w='100%' />
              <ActionIcon variant='subtle' size='lg'>
                <IconDirectionSignFilled fontSize='lg' />
              </ActionIcon>
            </Flex>
          </Flex>

          {/* Modal */}
          <PostModal opened={opened} onClose={close} postId={post.postId} />
        </>
      ) : (
        <></>
      )}
    </Paper>
  )
}

export default Post
