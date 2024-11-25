import {
  ActionIcon,
  Avatar,
  Divider,
  Flex,
  Modal,
  Text,
  TextInput,
} from "@mantine/core"
import {
  IconHeart,
  IconHeartBroken,
  IconDirectionSignFilled,
} from "@tabler/icons-react"
import React, { useState } from "react"

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
        commentId: "1",
        userId: "1",
        username: "mojisan",
        firstName: "Moji",
        lastName: "San",
        avatar: null,
      },
      commentMessage: "Kuy",
      like: 5,
      dislike: 1,
    },
  ],
}

interface IPostModal {
  postId: string
  opened: boolean
  onClose: () => void
}

const PostModal: React.FC<IPostModal> = ({ postId, opened, onClose }) => {
  const [isLike, setIsLike] = useState<boolean>(false)

  const handleLikePost = () => {
    setIsLike(!isLike)
  }

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title='Post Details'
      centered
      style={{
        width: "70%",
        maxWidth: "800px",
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
        </Flex>

        <Divider />

        <Text size='md'>Comment</Text>

        <Flex>
          {MockPost.comment.map((comment) => (
            <Flex
              key={comment.commentBy.commentId}
              justify='space-between'
              align='center'
              w='100%'
              gap='lg'
              style={{
                display: "flex",
                flexDirection: "row",
              }}
            >
              <Flex align='center' gap='lg'>
                <Avatar
                  src={comment.commentBy.avatar}
                  alt='profile'
                  radius='xl'
                  size='lg'
                  color='white'
                />
                <Text size='sm'>{comment.commentMessage}</Text>
              </Flex>

              <Flex gap='sm' align='center'>
                <Flex align='center' gap='sm'>
                  <ActionIcon
                    variant='subtle'
                    disabled={isLike}
                    onClick={handleLikePost}
                  >
                    <IconHeart />
                  </ActionIcon>
                  <Text size='sm'>{comment.like}</Text>
                </Flex>
                <Flex align='center' gap='sm'>
                  <ActionIcon
                    variant='subtle'
                    disabled={!isLike}
                    onClick={handleLikePost}
                  >
                    <IconHeartBroken />
                  </ActionIcon>
                  <Text size='sm'>{comment.dislike}</Text>
                </Flex>
              </Flex>
            </Flex>
          ))}
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
    </Modal>
  )
}

export default PostModal
