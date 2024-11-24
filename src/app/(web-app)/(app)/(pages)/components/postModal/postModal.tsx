import { Modal, Text } from "@mantine/core"
import React from "react"

interface IPostModal {
  postId: string
  opened: boolean
  close: () => void
}

const PostModal: React.FC<IPostModal> = ({ postId, opened, close }) => {
  return (
    <Modal opened={opened} onClose={close} title='Post Details'>
      <Text>Post ID: {postId}</Text>
      <Text>This is additional content for post {postId}.</Text>
    </Modal>
  )
}

export default PostModal
