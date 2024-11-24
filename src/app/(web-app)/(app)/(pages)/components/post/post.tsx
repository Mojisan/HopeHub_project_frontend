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
import React, { useState } from "react"
import PostModal from "../postModal/postModal"

interface IPost {
  postId: string
}

const MockPost = {
  postId: "1",
  postBy: {
    userId: "1",
    username: "mojisan",
    firstName: "Moji",
    lastName: "San",
    avatar: null,
  },
  title: "Hello World",
  content: "Apex is amazing!",
  postAt: "11-01-2024",
  like: 1,
  dislike: 5,
  comment: [
    {
      commentBy: {
        userId: "1",
        username: "mojisan",
        firstName: "Moji",
        lastName: "San",
        avatar: null,
      },
      commentMessage: "Kuy",
    },
  ],
}

const Post: React.FC<IPost> = ({ postId }) => {
  const [isLike, setIsLike] = useState<boolean>(false)
  const [opened, { open, close }] = useDisclosure(false)

  const handleLikePost = () => {
    setIsLike(!isLike)
  }

  return (
    <Paper
      shadow='sm'
      p='lg'
      radius='md'
      withBorder
      style={{
        width: "50%",
      }}
    >
      <Flex gap='lg' direction='column'>
        {/* Post Header */}
        <Flex gap='md'>
          <Avatar
            src={MockPost.postBy.avatar}
            alt='profile'
            radius='xl'
            size='lg'
            color='white'
          />
          <Flex direction='column'>
            <Text size='md' fw='normal'>
              {MockPost.postBy.firstName + " " + MockPost.postBy.lastName}
            </Text>
            <Text size='sm' fw='lighter'>
              @{MockPost.postBy.username} · 23 hours ago
            </Text>
          </Flex>
        </Flex>

        {/* Post Content */}
        <Flex direction='column'>
          <Text size='lg'>{MockPost.title}</Text>
          <Text size='sm'>{MockPost.content}</Text>
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
            <Text size='sm'>{MockPost.like}</Text>
          </Flex>
          <Flex align='center' gap='sm'>
            <ActionIcon
              variant='subtle'
              disabled={!isLike}
              onClick={handleLikePost}
            >
              <IconHeartBroken />
            </ActionIcon>
            <Text size='sm'>{MockPost.dislike}</Text>
          </Flex>
          <Flex align='center' gap='sm'>
            <ActionIcon variant='subtle' onClick={open}>
              <IconBubbleText />
            </ActionIcon>
            <Text size='sm'>{MockPost.comment.length}</Text>
          </Flex>
        </Flex>

        <Divider />

        {/* Comment Input */}
        <Flex align='center' gap='lg'>
          <Avatar
            src={MockPost.postBy.avatar}
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
      <PostModal opened={opened} close={close} postId={MockPost.postId} />
    </Paper>
  )
}

export default Post
