import { usePostStore } from "@/stores/usePostStore"
import {
  ActionIcon,
  Avatar,
  Box,
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
import React, { useEffect, useState } from "react"
import { IPost } from "../post/interface"
import { calculateHoursAgo } from "@/utils/calculateHoursAgo"
import { ICommentForm } from "./interface"
import { useForm } from "@mantine/form"
import { useCommentStore } from "@/stores/useCommentStore"
import { useUserStore } from "@/stores/useUserStore"

interface IPostModal {
  postId: string
  opened: boolean
  onClose: () => void
}

const BASE_URL = "http://localhost:5000"

const PostModal: React.FC<IPostModal> = ({ postId, opened, onClose }) => {
  const { loadPost } = usePostStore()
  const [post, setPost] = useState<IPost | null>(null) // State for the post
  const [isLike, setIsLike] = useState<boolean>(false)
  const { postComment } = useCommentStore()
  const { userId, currentUser } = useUserStore()

  // Fetch post data by ID
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const fetchedPost = await loadPost(postId) // Fetch post by ID
        setPost(fetchedPost)
      } catch (error) {
        console.error("Failed to fetch post:", error)
      }
    }

    if (postId) {
      fetchPost()
    }
  }, [postId, loadPost])

  const form = useForm<ICommentForm>({
    // validate: zodResolver(LoginSchemas),
    initialValues: {
      comment: "",
    },
  })

  const handleLikePost = () => {
    setIsLike(!isLike)
  }

  const handleComment = async (value: ICommentForm) => {
    console.log(1)
    const { comment } = value

    try {
      if (post) {
        await postComment(post.postId, comment, userId)
      }

      form.reset()
    } catch {
      alert("User Not Found")
      throw Error
    }
  }

  if (!post) {
    return (
      <Modal opened={opened} onClose={onClose} title='Post Details' centered>
        Loading post...
      </Modal>
    ) // Show loading text while fetching data
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
            src={post.postBy ? `${BASE_URL}${post.postBy.avatar}` : null}
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
              @{post.postBy.username} · {calculateHoursAgo(post.postAt)}
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
        </Flex>

        <Divider />

        <Text size='md'>Comment</Text>

        <Flex direction='column' gap='lg'>
          {post.comment.map((comment, index) => (
            <Flex
              key={index}
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
                  src={
                    comment.commentBy
                      ? `${BASE_URL}${comment.commentBy.avatar}`
                      : null
                  }
                  alt='profile'
                  radius='xl'
                  size='lg'
                  color='white'
                />
                <Text size='sm'>{comment.commentMessage}</Text>
              </Flex>

              <Flex gap='sm' align='center'>
                {/* <Flex align='center' gap='sm'>
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
                </Flex> */}
              </Flex>
            </Flex>
          ))}
        </Flex>

        <Divider />

        {/* Comment Input */}
        <Box component='form' onSubmit={form.onSubmit(handleComment)}>
          <Flex align='center' gap='lg'>
            <Avatar
              src={
                currentUser?.profile
                  ? `${BASE_URL}${currentUser.profile}`
                  : null
              }
              alt='profile'
              radius='xl'
              size='lg'
              color='white'
            />
            <TextInput
              placeholder='Add a comment'
              w='100%'
              {...form.getInputProps("comment")}
            />
            <ActionIcon variant='subtle' type='submit' size='lg'>
              <IconDirectionSignFilled fontSize='lg' />
            </ActionIcon>
          </Flex>
        </Box>
      </Flex>
    </Modal>
  )
}

export default PostModal
